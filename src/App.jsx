import React, { lazy, Suspense } from "react";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import RestrictedRoute from "./routes/RestrictedRoute";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

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
  const location = useLocation();

  return (
    <>
      <ToastContainer position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss={false}
          />

      <Suspense fallback={null}>
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
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </SharedLayout>
        </AnimatePresence>
      </Suspense>
    </>
  );
};

export default App;
