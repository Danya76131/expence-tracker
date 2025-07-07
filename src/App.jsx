import { lazy, Suspense } from "react";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import RestrictedRoute from "./routes/RestrictedRoute";
import AnimatedPage from "../src/components/AnimatedPage/AnimatedPage";
import { AnimatePresence } from "framer-motion";
import { Toaster } from 'react-hot-toast';





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
  const location = useLocation(); {/* для анімації */}

  return (
    <>
      <Suspense fallback={null}>
        <SharedLayout>
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <AnimatedPage><WelcomePage /></AnimatedPage>
              } />
              <Route
                path="/register"
                element={
                  <RestrictedRoute>
                    <AnimatedPage><RegisterPage /></AnimatedPage>
                  </RestrictedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <RestrictedRoute>
                    <AnimatedPage><LoginPage /></AnimatedPage>
                  </RestrictedRoute>
                }
              />
              <Route
                path="/transactions/:transactionsType"
                element={
                  <PrivateRoute>
                    <AnimatedPage><MainTransactionsPage /></AnimatedPage>
                  </PrivateRoute>
                }
              />
              <Route
                path="/transactions/history/:transactionsType"
                element={
                  <PrivateRoute>
                    <AnimatedPage><TransactionsHistoryPage /></AnimatedPage>
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
            </AnimatePresence>
        </SharedLayout>
      </Suspense>
    </>
  );
};

export default App;
