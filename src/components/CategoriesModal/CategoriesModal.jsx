import styles from "./CategoriesModal.module.css";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const CategoriesModal = () => {
  const [categories, setCategories] = useState([
    { id: 1, categoryName: "Cinema" },
    { id: 2, categoryName: "Music" },
    { id: 3, categoryName: "Sports" },
    { id: 4, categoryName: "Education" },
    { id: 5, categoryName: "Movie" },
    { id: 6, categoryName: "Cafe" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (itemRefs.current.every((ref) => ref && !ref.contains(event.target))) {
        setSelectedIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Incomes</h2>
      <button className={styles.buttonClose}>X</button>
      <h3 className={styles.categoryTitle}>All Categories</h3>
      <ul
        className={clsx(
          "scroll scrollB",
          styles.categoryList,
          categories.length === 0 && styles.noCategoriesBox
        )}
      >
        {categories.length === 0 ? (
          <li>
            <p className={styles.noCategoriesTitle}>There are no categories</p>
          </li>
        ) : (
          categories.map((item, index) => (
            <li
              key={item.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className={clsx(
                styles.categoryListItem,
                selectedIndex === index && styles.isActive
              )}
              onClick={() => handleItemClick(index)}
            >
              <p>{item.categoryName}</p>
              <span>
                <button className={styles.removeBtn}>Remove</button>
                <button className={styles.deleteBtn}>Delete</button>
              </span>
            </li>
          ))
        )}
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
