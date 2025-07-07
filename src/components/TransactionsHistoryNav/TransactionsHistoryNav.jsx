import Button from "../UI/Button/Button";
import css from "./TransactionsHistoryNav.module.css";

const TransactionsHistoryNav = () => {
  return (
    <div className={css.сenterButtons}>
      <Button variant="transparent">All Expense</Button>
      <Button variant="transparent">All Income</Button>
    </div>
  );
};

export default TransactionsHistoryNav;
