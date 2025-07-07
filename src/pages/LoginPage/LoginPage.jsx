import React, { useEffect, useRef } from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import css from './LoginPage.module.css';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/operations';  
import { selectIsLoggedIn, selectAuthLoading, selectAuthError, selectUser } from '../../redux/auth/selectors';
import BgImageWrapper from '../../components/BgImageWrapper/BgImageWrapper';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from '../../components/CustomToast/CustomToast';
import { resetError } from '../../redux/auth/slice';


function LoginPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
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

  // чистка помилок
  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/transactions/incomes');
    }
  }, [isLoggedIn, navigate]);

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
      const result = await dispatch(login(values)).unwrap();
      showSuccessToast(`Welcome back, ${result.user?.name || 'User'}!`);
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
            Welcome back to effortless expense tracking! Your financial dashboard awaits.
          </p>
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
