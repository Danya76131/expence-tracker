import { NavLink } from "react-router-dom";
import Button from "../UI/Button/Button";
import css from "./TransactionsHistoryNav.module.css";

const TransactionsHistoryNav = () => {
  return (
    <nav>
      <ul className={css.сenterButtons}>
        <li>
          <NavLink to={"/transactions/history/expenses"}>
            <Button variant="transparent">All Expense</Button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/transactions/history/incomes"}>
            <Button variant="transparent">All Income</Button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default TransactionsHistoryNav;
