import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/selectors";


const RestrictedRoute = ({ children }) => {
    


    const isLoggedIn = useSelector(selectIsLoggedIn);
    // console.log('RestrictedRoute - isLoggedIn:', isLoggedIn);
    return !isLoggedIn ? children : <Navigate to="/transactions/incomes" replace />;

};

export default RestrictedRoute;