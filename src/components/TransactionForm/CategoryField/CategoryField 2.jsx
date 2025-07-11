import { ErrorMessage } from "formik";
import s from "./CategoryField.module.css";

const CategoryField = ({ category, openModal }) => {
  return (
    <label htmlFor="category" className={s.label}>
      <span className={s.nameInput}>Category</span>
      <input
        readOnly
        id="category"
        className={s.categoryInput}
        placeholder="Select category"
        value={category?.name || "Select category"}
        onClick={openModal}
      />
      <ErrorMessage
        name="category"
        component="div"
        className={s.ErrorMessage}
      />
    </label>
    //   <label htmlFor="category" className={s.label}>
    //                 <span className={s.nameInput}>Category</span>
    //                 <input
    //                   readOnly
    //                   id="category"
    //                   className={s.categoryInput}
    //                   placeholder="Select category"
    //                   value={values.category?.name || "Select category"}
    //                   onClick={() => setModalOpen(true)}
    //                 />
    //                 <ErrorMessage
    //                   name="category"
    //                   component="div"
    //                   className={s.ErrorMessage}
    //                 />
    //               </label>
  );
};

export default CategoryField;
