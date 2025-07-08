import Icon from "../UI/Icon/Icon";
import css from "./Logo.module.css";

const Logo = ({ isAuthorized }) => {
  const redirectTo = isAuthorized ? "/main-transactions" : "/welcome";
  return (
    <div className={css.logoWrapper}>
      <a href={redirectTo}>
        <Icon className={css.logoIcon} />
        <span className={css.logoText}>ExpenseTracker</span>
      </a>
    </div>
  );
};

export default Logo;
