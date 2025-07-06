import CategoriesModal from "../../components/CategoriesModal/CategoriesModal";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import TransactionsChart from "../../components/TransactionsChart/TransactionsChart";
import TransactionsTotalAmount from "../../components/TransactionsTotalAmount/TransactionsTotalAmount";
import styles from "./MainTransactionsPage.module.css";

const MainTransactionsPage = () => {
  return (
    <Section>
      <Container>
        <h2 className={styles.mainTitle}>Expense Log</h2>
        <p className={styles.mainText}>
          Capture and organize every penny spent with ease! A clear view of your
          financial habits at your fingertips.
        </p>
        <CategoriesModal />
        <TransactionsTotalAmount />
        <TransactionsChart />
      </Container>
    </Section>
  );
};

export default MainTransactionsPage;
