import { useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionsChart from "../../components/TransactionsChart/TransactionsChart";
import TransactionsTotalAmount from "../../components/TransactionsTotalAmount/TransactionsTotalAmount";
import styles from "./MainTransactionsPage.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTransactions } from "../../redux/transactions/operations";

const MainTransactionsPage = () => {
  const dispatch = useDispatch();
  const { transactionsType } = useParams();

  const path = window.location.pathname;

  useEffect(() => {
    dispatch(getTransactions({ type: transactionsType }));
  }, [dispatch, transactionsType]);

  return (
    <Section>
      <Container>
        <div className={styles.mainWrapper}>
          <div className={styles.textWrapper}>
            <h2 className={styles.mainTitle}>
              {path.includes("/transactions/incomes")
                ? "Income Log"
                : "Expense Log"}
            </h2>
            <p className={styles.mainText}>
              Capture and organize every penny spent with ease! A clear view of
              your financial habits at your fingertips.
            </p>
          </div>
          <div className={styles.total}>
            <TransactionsTotalAmount />
          </div>
          <div className={styles.form}>
            <TransactionForm transactionsType={transactionsType} />
          </div>
          <div className={styles.chart}>
            <TransactionsChart transactionsType={transactionsType} />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default MainTransactionsPage;
