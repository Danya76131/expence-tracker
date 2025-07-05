import css from "./Authenticated.module.css";

const Authenticated = ({ firstName, lastName, logOut }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.logoText}>ExpenseTracker</div>
      <div className={css.centerButtons}>
        <button>All Expense</button>
        <button>All Income</button>
      </div>
      <div className={css.userBar}>
        <div>
          {firstName} {lastName}
        </div>
        <button onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
};

export default Authenticated;
