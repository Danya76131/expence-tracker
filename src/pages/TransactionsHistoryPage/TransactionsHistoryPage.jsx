// Oleksi @mail.com
// 1234Ol_1234 @
// brabrabra@gmail.com

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTransactionByType } from "../../redux/transactions/selectors";
import {
  getTransactions,
  deleteTransaction,
  updateTransactions,
} from "../../redux/transactions/operations";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import {
  ShowErrorToast,
  ShowSuccessToast,
} from "../../components/CustomToast/CustomToast";
import toast from "react-hot-toast";
// import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

import { TransactionsSearchTools } from "../../components/TransactionsSearchTools/TransactionsSearchTools";
import { selectFilter, selectDate } from "../../redux/filter/selectors";
const TransactionsHistoryPage = () => {
  const { transactionsType } = useParams(); // "incomes" або "expenses"
  const dispatch = useDispatch();
  console.log("params", transactionsType);

  const transactions = useSelector(selectTransactionByType(transactionsType));
  // const isLoading = useSelector(selectIsLoading);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const filter = useSelector(selectFilter);
  const date = useSelector(selectDate);

  useEffect(() => {
    if (!transactionsType) return;

    try {
      dispatch(getTransactions({ type: transactionsType, filter, date }));
    } catch (err) {
      console.error(err);
    }
  }, [transactionsType, dispatch, filter, date]);

  // useEffect(() => {
  //   try {
  //     dispatch(getTransactions(transactionsType));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [transactionsType, dispatch]);

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
    console.log("HistoryPage --> handleEditClick: ", tx);
    const { date, time, _id, sum, comment, type } = tx;
    setSelectedTransaction({ comment, date, sum, time, type, _id });
    setIsEditModalOpen(true);
    setCategoryName(tx.category.categoryName);
  };
  // console.log("HistoryPage --> Edit local state: ", selectedTransaction);

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

  // console.log("selected tr", selectedTransaction);

  return (
    <div>
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
          />
        </Backdrop>
      )}
    </div>
  );
};

export default TransactionsHistoryPage;
