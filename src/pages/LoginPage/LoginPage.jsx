// import React, { useEffect } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import css from './LoginPage.module.css';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { selectAuthError } from '../../redux/auth/selectors';
import BgImageWrapper from '../../components/BgImageWrapper/BgImageWrapper';
// import {selectAuthLoading} from '../redux/auth/selectors';
// імпорт для лоадера



function LoginPage() {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  // const isLoading = useSelector(state => state.auth.isLoading);

  

  const fields = [
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Password' },
  ];

  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email cannot contain spaces'),

    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/^[^\s]+$/, 'Password cannot contain spaces'),
  });

  const onSubmitAction = async (values) => {
    try {
      await dispatch(login(values)).unwrap();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const navigationData = {
    text: "Don`t have an account?",
    link: '/register',
    linkText: 'Sign Up',
  };

  return (
    <div className="login-wrapper">
      <div className={css.loginPage}>
          <div className={css.leftSide}>
        <BgImageWrapper desktopOnly />
          </div>
          <div className={css.rightSide}>
          <h2 className={css.title}>Sign In</h2>
          <p className={css.aboutApp}>
          Welcome back to effortless expense tracking! Your financial dashboard awaits.</p>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <AuthForm
        fields={fields}
        submitText="Sign In"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmitAction={onSubmitAction}
        navigationData={navigationData}
        formVariant="login"
        
      />
     </div> 
    </div>
    </div>
  );
}

export default LoginPage;