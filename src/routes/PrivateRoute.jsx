// PrivateRoute.js

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/selectors";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);
  if (isRefreshing) return null;
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
