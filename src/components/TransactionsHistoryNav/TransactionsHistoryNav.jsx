import Button from "../UI/Button/Button";
import css from "./TransactionsHistoryNav.module.css";

const TransactionsHistoryNav = () => {
  return (
    <div className={css.centerButtons}>
      <Button>All Expense</Button>
      <Button>All Income</Button>
    </div>
  );
};

export default TransactionsHistoryNav;
