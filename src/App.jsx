import { lazy } from "react";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { Navigate, Route, Routes } from "react-router-dom";

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
  return (
    <SharedLayout>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/transactions/:transactionsType"
          element={<MainTransactionsPage />}
        />
        <Route
          path="/transactions/history/:transactionsType"
          element={<TransactionsHistoryPage />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </SharedLayout>
  );
};
export default App;
