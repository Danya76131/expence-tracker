import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { BsCalendar2Week } from "react-icons/bs";
import styles from "./TransactionsList.module.css";

const TransactionsList = ({ transactions, onDelete, onEdit }) => {
  // console.warn("List -- Transction -->", transactions);
  return (
    <div className={styles.wrapper}>
      {/* Фільтр */}
      <div className={styles.filter}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for anything..."
          />
          <FiSearch className={styles.icon} />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.dateInput}
            placeholder="dd/mm/yyyy"
          />
          <BsCalendar2Week className={styles.icon} />
        </div>
      </div>

      {/* Таблиця */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.cell}>Category</th>
              <th className={styles.cell}>Comment</th>
              <th className={styles.cell}>Date</th>
              <th className={styles.cell}>Time</th>
              <th className={styles.cell}>Sum</th>
              <th className={`${styles.cell} ${styles.actions}`}>Actions</th>
            </tr>
          </thead>

          <tbody className={styles.bodyWrapper}>
            {/* <tr>
            <td className={styles.cell}>Cinema</td>
            <td className={styles.cell}>John Wick: Chapter 3 – Parabellum</td>
            <td className={styles.cell}>Sn, 3.03.2023</td>
            <td className={styles.cell}>14:30</td>
            <td className={styles.cell}>150 / UAH</td>
            <td className={`${styles.cell} ${styles.actions}`}>
              <button className={styles.editBtn}>
                <FiEdit2 />
                <span className={styles.btnEditText}>Edit</span>
              </button>
              <button className={styles.deleteBtn}>
                <RiDeleteBinLine />
                <span className={styles.btnDeleteText}>Delete</span>
              </button>
            </td>
          </tr> */}
            {transactions.map((tx) => (
              <tr key={tx._id}>
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
