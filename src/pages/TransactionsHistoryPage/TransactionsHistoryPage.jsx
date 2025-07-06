// import styles from "./TransactionsHistoryPage.module.css";

// const TransactionsHistoryPage = () => {
//   return <div className={styles.wrapper}>TransactionsHistoryPage</div>;
// };

// export default TransactionsHistoryPage;

import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import {
  deleteTransaction,
  getTransactions,
} from "../../redux/transactions/operations";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
// import TransactionForm from "../../components/TransactionForm/TransactionForm";
// import { useParams } from "react-router-dom";

const TransactionsHistoryPage = () => {
  //   const { type } = useParams();

  const [transactions, setTransactions] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const data = await getTransactions();
        // setTransactions(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));
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
      <TransactionsList
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={handleEditClick}
      />
      {/* {isEditModalOpen && (
        <TransactionForm selectedTransaction={selectedTransaction} />
      )} */}
    </div>
  );
};

export default TransactionsHistoryPage;
