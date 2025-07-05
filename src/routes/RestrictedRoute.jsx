import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/selectors";


const RestrictedRoute = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return !isLoggedIn ? children : <Navigate to="/main-transactions" replace />;
};

export default RestrictedRoute;