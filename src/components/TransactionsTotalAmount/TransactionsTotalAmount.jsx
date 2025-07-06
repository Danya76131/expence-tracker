import React from "react";
import styles from "./TransactionsTotalAmount.module.css";
import { PiArrowDownLeftBold, PiArrowUpRightBold } from "react-icons/pi";

const Card = ({ type, amount }) => {
  const isIncome = type === "income";

  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        {isIncome ? (
          <PiArrowUpRightBold color="black" />
        ) : (
          <PiArrowDownLeftBold color="black" />
        )}
      </div>
      <div>
        <p className={styles.label}>
          {isIncome ? "Total Income" : "Total Expense"}
        </p>
        <p className={styles.amount}>${(amount || 0).toFixed(3)}</p>
      </div>
    </div>
  );
};

const TransactionsTotalAmount = () => {
  return (
    <div className={styles.wrapper}>
      <Card type="income" amount={632} />
      <Card type="expense" amount={632} />
    </div>
  );
};

export default TransactionsTotalAmount;
