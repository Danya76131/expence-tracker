import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import css from './AuthForm.module.css';

const AuthForm = ({
  fields = [],
  submitText,
  initialValues,
  validationSchema,
  onSubmitAction,
  navigationData, 
  formVariant = ''
}) => {
  const [showPassword, setShowPassword] = useState({});
  const [validationStatus, setValidationStatus] = useState({});
  const [showValidationIcon, setShowValidationIcon] = useState({});

  const togglePasswordVisibility = (fieldName) => {
    setShowPassword(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowValidationIcon({});
    }, 2000);
    return () => clearTimeout(timer);
  }, [validationStatus]);

  const useFieldValidation = (name, hasError, isValid) => {
    useEffect(() => {
      if (hasError || isValid) {
        setValidationStatus(prev => ({
          ...prev,
          [name]: hasError ? 'error' : 'valid'
        }));
        setShowValidationIcon(prev => ({
          ...prev,
          [name]: true
        }));
      }
    }, [hasError, isValid, name]);
  };

  return (
    <div className={`${css.container} ${formVariant ? css[formVariant] : ''}`}>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            await onSubmitAction(values);
          } catch (error) {
            console.error('Form error:', error);
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form className={css.form}>
            
         {/* змін п */}
         <div className={`${css.fieldsSection} ${formVariant ? css[`${formVariant}Fields`] : ''}`}>
              {fields.map(({ name, type, placeholder }) => {
                const isPasswordField = type === 'password';
                const isEmailField = type === 'email';
                const isNameField = name === 'name';
                const currentType = isPasswordField && showPassword[name] ? 'text' : type;
                const hasError = errors[name] && touched[name];
                const isValid = !errors[name] && touched[name] && values[name];
                const showEyeIcon = isPasswordField && values[name];
                const showValidationIconForField = (isEmailField || isNameField) && values[name];

                useFieldValidation(name, hasError, isValid);

                return (
                  <div key={name} className={css.fieldGroup}>
                    <div className={css.inputWrapper}>
                    <Field
                    name={name}
                    type={currentType}
                    placeholder={placeholder}
                    autoComplete="current-password"
                    className={`${css.input} 
              ${formVariant === 'login' ? css.loginInput : ''} 
              ${hasError ? css.inputError : ''} 
              ${isValid ? css.inputValid : ''}`}
/>
                      {(showEyeIcon || showValidationIconForField) && (
  <div className={`${css.iconContainer}
    ${formVariant === 'login' ? css.loginIconContainer : ''}`}>
    {showValidationIcon[name] ? (
      validationStatus[name] === 'error' ? (
        <FaTimesCircle 
          className={`${css.icon} ${css.errorIcon}`}
          key="error-icon"
        />
      ) : (
        <FaCheckCircle 
          className={`${css.icon} ${css.validIcon}`}
          key="valid-icon"
        />
      )
    ) : showEyeIcon ? (
      <button
        type="button"
        className={css.toggleButton}
        onClick={() => togglePasswordVisibility(name)}
        tabIndex="-1"
      >
        {showPassword[name] ? (
          <LuEye
            className={`${css.icon} ${css.eyeIcon}`}
            key="eye-open"
          />
        ) : (
          <LuEyeOff 
            className={`${css.icon} ${css.eyeIcon}`}
            key="eye-closed"
          />
        )}
      </button>
    ) : null}
  </div>
)}
                    </div>
                    <div className={`${css.err} ${hasError ? css.visible : ''}`}>
  {hasError ? errors[name] : ' '}
</div>
               </div>
                );
              })}
            </div>

            
            <div className={css.footerSection}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${css.submitBtn} ${formVariant ? css[`${formVariant}SubmitBtn`] : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onTouchStart={(e) => e.preventDefault()}
              >
                {submitText}
              </button>

              {navigationData && (
                <div className={css.footer}>
                  {navigationData.text}{' '}
                  <NavLink
                    to={navigationData.link}
                    className={({ isActive }) =>
                      `${css.footerLink} ${isActive ? css.footerLinkActive : ''}`
                    }
                  >
                    {navigationData.linkText}
                  </NavLink>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;