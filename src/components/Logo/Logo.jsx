import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Link } from "react-router-dom";
import Icon from "../UI/Icon/Icon";
import css from "./Logo.module.css";

const Logo = () => {
  const isAuthorized = useSelector(selectIsLoggedIn);
  const redirectTo = isAuthorized ? "/transactions/expenses" : "/";

  return (
    <div className={css.logoWrapper}>
      <Link to={redirectTo}>
        <Icon className={css.logoIcon} />
        <span className={css.logoText}>ExpenseTracker</span>
      </Link>
    </div>
  );
};

export default Logo;
