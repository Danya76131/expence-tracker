import React, { useEffect } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import css from "./LoginPage.module.css";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { selectAuthError, selectIsLoggedIn } from "../../redux/auth/selectors";
import BgImageWrapper from "../../components/BgImageWrapper/BgImageWrapper";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ShowErrorToast,
  ShowSuccessToast,
} from "../../components/CustomToast/CustomToast";
import Loader from "../../components/Loader/Loader";

function LoginPage() {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/transactions/incomes");
    }
  }, [isLoggedIn, navigate]);

  const fields = [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email cannot contain spaces"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/^[^\s]+$/, "Password cannot contain spaces"),
  });

  const onSubmitAction = async (values) => {
    try {
      await dispatch(login(values)).unwrap();

      toast.custom(
        <ShowSuccessToast
          msg={`Welcome back, ${values.name || values.email}!`}
        />
      );
    } catch (error) {
      toast.custom(
        <ShowErrorToast msg={"Something went wrong! Try again later"} />
      );
    }
  };

  const navigationData = {
    text: "Don`t have an account?",
    link: "/register",
    linkText: "Sign Up",
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
            Welcome back to effortless expense tracking! Your financial
            dashboard awaits.
          </p>
          {error && (
            <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
          )}
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
