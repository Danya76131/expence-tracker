import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { BsCalendar2Week } from "react-icons/bs";
import styles from "./TransactionsList.module.css";

const TransactionsList = ({ transactions, onDelete, onEdit }) => {
  return (
    <div className={styles.wrapper}>
      {/* Таблиця */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.cell}>Category</th>
              <th className={styles.cell}>Comment</th>
              <th className={styles.cell}>Date</th>
              <th className={styles.cell}>Time</th>
              <th className={styles.cell}>Sum</th>
              <th className={`${styles.cell} ${styles.actions}`}>Actions</th>
            </tr>
          </thead>

          <tbody className={styles.list}>
            {transactions.map((tx) => (
              <tr className={styles.listItem} key={tx._id}>
                <td className={styles.cell}>{tx.category.categoryName}</td>
                <td className={styles.cell}>{tx.comment}</td>
                <td className={styles.cell}>{tx.date}</td>
                <td className={styles.cell}>{tx.time}</td>
                <td className={styles.cell}>{tx.sum}</td>
                <td className={`${styles.cell} ${styles.actions}`}>
                  <button className={styles.editBtn} onClick={() => onEdit(tx)}>
                    <FiEdit2 />
                    <span className={styles.btnEditText}>Edit</span>
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => onDelete(tx._id)}
                  >
                    <RiDeleteBinLine />
                    <span className={styles.btnDeleteText}>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
