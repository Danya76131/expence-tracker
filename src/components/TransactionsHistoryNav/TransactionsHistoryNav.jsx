import React from "react";
import styles from "./TransactionsHistoryNav.module.css";
import { NavLink } from "react-router-dom";

const TransactionsHistoryNav = () => {
  return (
    // <div className={styles.wrapper}>TransactionsHistoryNav</div>
    <nav>
      <ul>
        <li>
          <NavLink to="/transactions/history/expenses">All expense</NavLink>
        </li>
        <li>
          <NavLink to="/transactions/history/incomes">All income</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default TransactionsHistoryNav;
