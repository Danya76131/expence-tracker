// Oleksi @mail.com
// 1234Ol_1234 @
// brabrabra@gmail.com

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTransactionByType } from "../../redux/transactions/selectors";
import {
  getTransactions,
  deleteTransaction,
  // updateTransactions,
} from "../../redux/transactions/operations";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import {
  ShowErrorToast,
  ShowSuccessToast,
} from "../../components/CustomToast/CustomToast";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

import { TransactionsSearchTools } from "../../components/TransactionsSearchTools/TransactionsSearchTools";
// import { selectFilter, selectDate } from "../../redux/filter/selectors";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import TransactionsTotalAmount from "../../components/TransactionsTotalAmount/TransactionsTotalAmount";
import styles from "./TransactionsHistoryPage.module.css";
const TransactionsHistoryPage = () => {
  const { transactionsType } = useParams(); // "incomes" або "expenses"
  const dispatch = useDispatch();

  const transactions = useSelector(selectTransactionByType(transactionsType));
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  ////////
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("search") || "";
  const date = searchParams.get("date") || null;
  // const filter = useSelector(selectFilter);
  // const date = useSelector(selectDate);
  ////////
  useEffect(() => {
    if (!transactionsType) return;
    dispatch(getTransactions({ type: transactionsType }));
  }, [dispatch, transactionsType]);

  useEffect(() => {
    if (!transactionsType) return;

    try {
      // if (filter || date)
      dispatch(
        getTransactions({
          type: transactionsType,
          filter: filter || null,
          date: date || null,
        })
      );
    } catch (err) {
      console.error(err);
    }
  }, [transactionsType, dispatch, filter, date]);

  const handleDelete = async (id) => {
    dispatch(deleteTransaction(id))
      .unwrap()
      .then(() =>
        toast.custom(<ShowSuccessToast msg={"Транзакцію видалено !"} />)
      )
      .catch(() =>
        toast.custom(<ShowErrorToast msg={"Не вдалося видалити транзакцію"} />)
      );
  };

  const handleEditClick = (tx) => {
    const { date, time, _id, sum, comment, type } = tx;
    setSelectedTransaction({ comment, date, sum, time, type, _id });
    setIsEditModalOpen(true);
    setCategoryName(tx.category.categoryName);
  };

  // const handleFormSubmit = (values) => {
  //   dispatch(updateTransactions(values))
  //     .unwrap()
  //     .then(() => {
  //       toast.custom(<ShowSuccessToast msg={"Транзакцію оновлено !"} />);
  //       dispatch(getTransactions(transactionsType)); // оновлення списку
  //     })
  //     .catch(() =>
  //       toast.custom(<ShowErrorToast msg={"Не вдалося оновити транзакцію"} />)
  //     );
  // };

  let text = "All Expense";
  let description =
    "View and manage every transaction seamlessly! Your entire financial landscape, all in one place.";
  if (transactionsType === "incomes") {
    text = "All incomes";
    description =
      "Track and celebrate every bit of earnings effortlessly! Gain insights into your total revenue in a snap.";
  }
  return (
    <Section>
      <Container>
        <div className={styles.topWrapper}>
          <div className={styles.textWrapper}>
            <h2 className={styles.mainTitle}>{text}</h2>
            <p className={styles.mainText}>{description}</p>
          </div>
          <div className={styles.total}>
            <TransactionsTotalAmount />
          </div>
        </div>
        <TransactionsSearchTools
          // handleOpenModal={toggleIsAddModal}
          type={transactionsType}
        />
        <TransactionsList
          transactions={transactions}
          transactionsType={transactionsType}
          onDelete={handleDelete}
          onEdit={handleEditClick}
        />

        {isEditModalOpen && (
          <Backdrop onClose={() => setIsEditModalOpen(false)}>
            <TransactionForm
              editedData={{
                selectedTransaction,
                categoryName,
              }}
              categoryName={categoryName}
              // onSubmit={handleFormSubmit}
              isEditMode={isEditModalOpen}
              transactionsType={transactionsType}
              handleCloseEditModal={() => setIsEditModalOpen(false)}
            />
          </Backdrop>
        )}
      </Container>
    </Section>
  );
};

export default TransactionsHistoryPage;
