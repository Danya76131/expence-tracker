import styles from "./CategoriesModal.module.css";
import clsx from "clsx";
import { useState } from "react";

const CategoriesModal = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Incomes</h2>
      <button className={styles.buttonClose}>X</button>
      <ul className={styles.categoryList}>
        <h3 className={styles.categoryTitle}> All Category</h3>
        <li
          className={clsx(styles.categoryListItem, selected && styles.isActive)}
          onFocus={() => setSelected(true)}
        >
          Cinema
          <span>
            <button className={styles.removeBtn}>Remove</button>
            <button className={styles.deleteBtn}>Delete</button>
          </span>
        </li>
      </ul>
      <div className={styles.categoryBox}>
        <h3 className={styles.categoryName}>New Category</h3>
        <form>
          <input
            className={styles.categoryInput}
            type="text"
            placeholder="Enter the text"
          />
          <button type="submit" className={styles.buttonAdd}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoriesModal;
