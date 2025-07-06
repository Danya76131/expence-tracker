// import styles from "./TransactionsHistoryPage.module.css";

// const TransactionsHistoryPage = () => {
//   return <div className={styles.wrapper}>TransactionsHistoryPage</div>;
// };

// export default TransactionsHistoryPage;

// Oleksi @mail.com
// 1234Ol_1234 @

import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import {
  deleteTransaction,
  getTransactions,
} from "../../redux/transactions/operations";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
// import TransactionForm from "../../components/TransactionForm/TransactionForm";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const TransactionsHistoryPage = () => {
  const { transactionsType } = useParams();
  const dispatch = useDispatch();

  // const [transactions, setTransactions] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});

  useEffect(() => {
    try {
      dispatch(getTransactions(transactionsType));
      // setTransactions(data);
      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  }, [transactionsType]);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      // setTransactions((prev) => prev.filter((tx) => tx.id !== id));
      toast.success("Транзакцію видалено");
    } catch (err) {
      toast.error("Не вдалося видалити транзакцію");
      console.error(err);
    }
  };

  const handleEditClick = (tx) => {
    setSelectedTransaction(tx);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      {/* <TransactionsList
        transactions={transactions}
        type={transactionsType}
        onDelete={handleDelete}
        onEdit={handleEditClick}
      /> */}
      {/* {isEditModalOpen && (
        <TransactionForm selectedTransaction={selectedTransaction} />
      )} */}
    </div>
  );
};

export default TransactionsHistoryPage;
