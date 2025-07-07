import React, { useEffect, useRef } from 'react';
import AuthForm from "../../components/AuthForm/AuthForm"
import css from './RegisterPage.module.css';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import BgImageWrapper from '../../components/BgImageWrapper/BgImageWrapper';
import { selectAuthLoading, selectAuthError, selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { showSuccessToast, showErrorToast } from '../../components/CustomToast/CustomToast';
import { resetError } from '../../redux/auth/slice';


function RegisterPage() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const prevLoading = useRef(false);

  useEffect(() => {
    if (prevLoading.current && !isLoading) {
      if (error) {
        showErrorToast(error.message || error);
      }
    }
    prevLoading.current = isLoading;
  }, [isLoading, error]);

  // помилки
  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const fields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Password' },
  ];

  const initialValues = { name: '', email: '', password: '' };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(30, 'Name must be less than 30 characters')
      .matches(
        /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
        'Name cannot contain numbers or special characters'
      )
      .test(
        'no-extra-spaces',
        'Name cannot start/end with spaces',
        (value) => value && value.trim() === value
      ),
    email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Only Latin characters are allowed'
      )
      .test(
        'no-cyrillic',
        'Cyrillic characters are not allowed in email',
        (value) => value && !/[а-яА-ЯёЁ]/.test(value)
      ),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  const onSubmitAction = async (values) => {
    try {
      const result = await dispatch(register(values)).unwrap();
      showSuccessToast(`Registration successful! Welcome, ${result.user?.name || 'User'}!`);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const navigationData = {
    text: 'Already have an account?',
    link: '/login',
    linkText: 'Sign In',
    linkClass: ({ isActive }) =>
      `${css.navLink} ${isActive ? css.navLinkActive : ''}`
  };

  return (
    <div className="login-wrapper">
      <div className={css.regPage}>
        <div className={css.leftSide}>
          <BgImageWrapper desktopOnly />
        </div>
        <div className={css.rightSide}>
          <h2 className={css.title}>Sign Up</h2>
          <p className={css.aboutApp}>
            Step into a world of hassle-free expense management! Your journey towards financial mastery begins here.
          </p>
          <AuthForm
            fields={fields}
            submitText="Sign Up"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmitAction={onSubmitAction}
            navigationData={navigationData}
            formVariant="register"
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
