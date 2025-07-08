import styles from "./CategoriesModal.module.css";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Backdrop from "../UI/Backdrop/Backdrop";
import Icon from "../UI/Icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "../../redux/categories/operations";
import {
  selectCategoryByType,
  selectCategoryExpenses,
  selectCategoryIncomes,
  selectCategoryState,
} from "../../redux/categories/selectors";
import { getTransactions } from "../../redux/transactions/operations";
// import { getTransactions } from "../../redux/transactions/operations";

const CategoriesModal = ({ type, closeModal, onSelect }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      removeEventListener("keydown", handleEsc);
    };
  }, [closeModal]);

  const categories = useSelector(selectCategoryByType(type));

  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const itemRefs = useRef([]);

  // const selectedId = useSelector(selectCategoryId(categoryId));

  const handleEditCategory = (id, name) => {
    setCategoryName(name);
    console.warn("CatModal EditCategory ID -->", id);
    console.warn("CatModal EditCategory Name -->", name);
    setCategoryId(id);
    setIsEditMode(true);
  };

  const handleCheck = (item) => {
    console.log("item modal", item);

    onSelect(item);
  };

  const handleSubmitCategory = async (event) => {
    event.preventDefault();
    console.log("pressed on submit btn");
    if (categoryName.length > 16) {
      console.log("what is categoryName", categoryName);
      toast.error(
        "Category name length must be less than or equal to 16 characters long"
      );
      return;
    }
    console.log(categoryId);

    if (isEditMode) {
      try {
        await dispatch(editCategory({ categoryName, categoryId }))
          .unwrap()
          .then(() => {
            dispatch(getTransactions(type));
            isEditMode(false);
          });
      } catch (error) {
        toast.error(error);
      }
    } else {
      dispatch(addCategory({ type: type, categoryName: categoryName }))
        .unwrap()
        .then(() => {
          toast.success("New Category added successfully");
          console.log("success");
        })
        .catch(() => {
          toast.error("Error adding category  ");
        });
    }
    setCategoryName("");
  };

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleDeleteCategory = (id, type) => {
    setIsEditMode(false);
    setIsButtonDisabled(true);
    dispatch(deleteCategory({ id, type }))
      .unwrap()
      .then(() => toast.success("Category deleted successfully"))
      .catch(() => {
        toast.error("Cannot delete category with existing transactions");
      })
      .finally(setIsButtonDisabled(false));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!isEditMode) {
      setCategoryName("");
    }
  }, [isEditMode]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (itemRefs.current.every((ref) => ref && !ref.contains(event.target))) {
  //       setCategoryId(null);
  //       setIsEditMode(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  // const handleItemClick = (index) => {
  //   setCategoryId(index === categoryId ? null : index);
  // };

  return (
    <Backdrop>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          {type === "expenses" ? "Expenses" : "Incomes"}
        </h2>

        <h3 className={styles.categoryTitle}>All Categories</h3>
        <ul
          className={clsx(
            "scroll scrollB",
            styles.categoryList,
            categories[type]?.length === 0 && styles.noCategoriesBox
          )}
        >
          {categories.length === 0 ? (
            <li>
              <p className={styles.noCategoriesTitle}>
                There are no categories
              </p>
            </li>
          ) : (
            categories.map((item) => (
              <li
                key={item._id}
                ref={(el) => (itemRefs.current[item._id] = el)}
                className={clsx(
                  styles.categoryListItem,
                  categoryId === item._id && styles.isActive
                )}
                onClick={() =>
                  setCategoryId(categoryId === item._id ? null : item._id)
                }
              >
                <p>{item.categoryName}</p>
                <span className={styles.icons}>
                  <button
                    onClick={() => {
                      handleCheck(item);
                    }}
                    className={styles.check}
                  >
                    <Icon
                      name="check"
                      size={14}
                      fill="transparent"
                      stroke="#0ef387"
                    />
                  </button>
                  <button
                    className={styles.editBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditCategory(item._id, item.categoryName);
                    }}
                  >
                    {" "}
                    <Icon
                      name="edit"
                      size={16}
                      fill="transparent"
                      stroke="#0ef387"
                    />
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteCategory(item._id, type)}
                    // disabled={isButtonDisabled}
                  >
                    {" "}
                    <Icon
                      name="trash"
                      size={16}
                      fill="transparent"
                      stroke="#0ef387"
                    />
                  </button>
                </span>
              </li>
            ))
          )}
        </ul>

        <div className={styles.categoryBox}>
          <h3 className={styles.categoryName}>
            {isEditMode ? "Edit category" : "New Category"}
          </h3>
          <div>
            <label
              className={styles.categoryName}
              htmlFor="categoryInput"
            ></label>
            <input
              id="categoryInput"
              className={styles.categoryInput}
              type="text"
              placeholder="Enter the text"
              onChange={handleInputChange}
              value={categoryName}
            />
            <button
              type="button"
              className={styles.buttonAdd}
              onClick={handleSubmitCategory}
              // disabled={categoryName.length === 0}
            >
              {isEditMode ? "Edit" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default CategoriesModal;
