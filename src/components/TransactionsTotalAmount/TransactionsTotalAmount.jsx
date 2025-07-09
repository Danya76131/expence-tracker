import React, { useEffect } from "react";
import styles from "./TransactionsTotalAmount.module.css";
import Icon from "../UI/Icon/Icon";
import { useSelector } from "react-redux";
import { selectUserTransactionsTotal } from "../../redux/user/selectors";

const Card = ({ type, amount }) => {
  const isIncome = type === "income";

  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        {isIncome ? (
          <Icon name="arrow-up" fill="#0c0d0d" stroke="#0c0d0d" />
        ) : (
          <Icon name="arrow-down" fill="#0c0d0d" stroke="#0c0d0d" />
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
  // const incomesTotal = useSelector((state) => state.transactions.incomesTotal);
  // const expensesTotal = useSelector(
  //   (state) => state.transactions.expensesTotal
  // );

  const totalAmount = useSelector(selectUserTransactionsTotal);

  // ✅ Зберігати у localStorage при зміні
  // useEffect(() => {
  //   if (incomesTotal != null) {
  //     localStorage.setItem("incomesTotal", JSON.stringify(incomesTotal));
  //   }
  //   if (expensesTotal != null) {
  //     localStorage.setItem("expensesTotal", JSON.stringify(expensesTotal));
  //   }
  // }, [incomesTotal, expensesTotal]);

  return (
    <div className={styles.wrapper}>
      <Card type="income" amount={totalAmount.incomes} />
      <Card type="expense" amount={totalAmount.expenses} />
    </div>
  );
};

export default TransactionsTotalAmount;
