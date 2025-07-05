import { Field } from "formik";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import s from "./TransactionType.module.css";

const TransactionType = ({ value }) => {
  return (
    <div className={s.radioGroup}>
      <label htmlFor="expense" className={s.radioLabel}>
        <Field
          id="expense"
          type="radio"
          name="transactionType"
          value="expense"
        />
        {value === "expense" ? (
          <MdRadioButtonChecked className={s.radioButtonActive} />
        ) : (
          <MdRadioButtonUnchecked className={s.radioButton} />
        )}
        <span className={s.radioSpan}>Expense</span>
      </label>

      <label htmlFor="income" className={s.radioLabel}>
        <Field id="income" type="radio" name="transactionType" value="income" />
        {value === "income" ? (
          <MdRadioButtonChecked className={s.radioButtonActive} />
        ) : (
          <MdRadioButtonUnchecked className={s.radioButton} />
        )}
        <span className={s.radioSpan}>Income</span>
      </label>
    </div>
  );
};

export default TransactionType;
