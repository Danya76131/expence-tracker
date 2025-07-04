import { Field, ErrorMessage } from "formik";
import { Calendar } from "lucide-react";
import { useRef } from "react";
import s from "./DateField.module.css";

const DateField = ({ inputRef }) => {
  return (
    <label htmlFor="date" className={s.label}>
      <span className={s.nameInput}>Date</span>
      <div className={s.timeRelative}>
        <Field
          innerRef={inputRef}
          id="date"
          type="date"
          name="date"
          className={s.dateInput}
          //   value={value}
          //   onChange={(e) => setFieldValue("date", e.target.value)}
        />
        <Calendar
          className={s.calendar}
          onClick={() =>
            inputRef.current?.showPicker?.() || inputRef.current?.click()
          }
        />
      </div>
      <ErrorMessage name="date" component="div" className={s.ErrorMessage} />
    </label>
    // <label htmlFor="date" className={s.label}>
    //   <span className={s.nameInput}>Date</span>
    //   <div className={s.timeRelative}>
    //     <Field
    //       innerRef={dateRef}
    //       id="date"
    //       type="date"
    //       name="date"
    //       className={s.dateInput}
    //       value={values.date}
    //       onChange={(e) => setFieldValue("date", e.target.value)}
    //     />
    //     <Calendar
    //       className={s.calendar}
    //       onClick={() =>
    //         dateRef.current?.showPicker?.() || dateRef.current?.click()
    //       }
    //     />
    //   </div>
    //   <ErrorMessage name="date" component="div" className={s.ErrorMessage} />
    // </label>
  );
};

export default DateField;
