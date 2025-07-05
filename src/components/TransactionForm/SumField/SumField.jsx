import { Field, ErrorMessage } from "formik";
// import { useSelector } from "react-redux";
// import { selectUserCurrency } from "redux/user/selectors";

import s from "./SumField.module.css";

const SumField = () => {
  //   const currency = useSelector(selectUserCurrency);

  return (
    <label htmlFor="sum" className={s.label}>
      <span className={s.nameInputOther}>Sum</span>
      <div className={s.inputWrapperSum}>
        <Field
          id="sum"
          name="sum"
          type="number"
          step="0.1"
          min="0.1"
          placeholder="Enter the sum"
          className={s.sumInput}
        />
        <span className={s.sumInputSuffix}>UAH</span>
      </div>
      <ErrorMessage name="sum" component="div" className={s.ErrorMessage} />
    </label>
    //    <label htmlFor="sum" className={s.label}>
    //                 <span className={s.nameInputOther}>Sum</span>
    //                 <div className={s.inputWrapperSum}>
    //                   <Field
    //                     id="sum"
    //                     name="sum"
    //                     type="number"
    //                     step="0.1"
    //                     min="0.01"
    //                     placeholder="Enter the sum"
    //                     className={s.sumInput}
    //                   />
    //                   <span className={s.sumInputSuffix}>UAH</span>
    //                 </div>
    //                 <ErrorMessage
    //                   name="sum"
    //                   component="div"
    //                   className={s.ErrorMessage}
    //                 />
    //               </label>
  );
};

export default SumField;
