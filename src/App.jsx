import { lazy, Suspense, useEffect } from "react";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import RestrictedRoute from "./routes/RestrictedRoute";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { selectRefreshToken } from "./redux/auth/selectors";
import { getCurrentUser } from "./redux/user/operations";
import { useInitFinanceData } from "./hooks/useInitFinanceData";

import Loader from "./components/Loader/Loader";

import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { refreshUser } from "./redux/auth/operations";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const MainTransactionsPage = lazy(() =>
  import("./pages/MainTransactionsPage/MainTransactionsPage")
);
const TransactionsHistoryPage = lazy(() =>
  import("./pages/TransactionsHistoryPage/TransactionsHistoryPage")
);

const App = () => {
  useInitFinanceData();

  const dispatch = useDispatch();
  const refreshToken = useSelector(selectRefreshToken);
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);

  // useEffect(() => {
  //   if (refreshToken) dispatch(getCurrentUser());
  // }, [dispatch, refreshToken]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // для анімашки
  const location = useLocation();
  return isRefreshing ? null : (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<Loader />}>
        <AnimatePresence mode="wait" initial={false}>
          <SharedLayout>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<WelcomePage />} />
              <Route
                path="/register"
                element={
                  <RestrictedRoute>
                    <RegisterPage />
                  </RestrictedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <RestrictedRoute>
                    <LoginPage />
                  </RestrictedRoute>
                }
              />
              <Route
                path="/transactions/:transactionsType"
                element={
                  <PrivateRoute>
                    <MainTransactionsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/transactions/history/:transactionsType"
                element={
                  <PrivateRoute>
                    <TransactionsHistoryPage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </SharedLayout>
        </AnimatePresence>
      </Suspense>
    </>
  );
};

export default App;
