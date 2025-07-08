import { Field, ErrorMessage } from "formik";
import { Clock } from "lucide-react";
import s from "./TimeField.module.css";

const TimeField = ({ inputRef }) => {
  return (
    <label htmlFor="time" className={s.label}>
      <span className={s.nameInput}>Time</span>
      <div className={s.timeRelative}>
        <Field
          innerRef={inputRef}
          id="time"
          type="time"
          name="time"
          className={s.timeInput}
          //   value={value}
          //   onChange={(e) => setFieldValue("time", e.target.value)}
        />
        <Clock
          className={s.timeOutline}
          onClick={() =>
            inputRef.current?.showPicker?.() || inputRef.current?.click()
          }
        />
      </div>
      <ErrorMessage name="time" component="div" className={s.ErrorMessage} />
    </label>
    //    <label htmlFor="time" className={s.label}>
    //                     <span className={s.nameInput}>Time</span>
    //                     <div className={s.timeRelative}>
    //                       <Field
    //                         innerRef={timeRef}
    //                         id="time"
    //                         type="time"
    //                         name="time"
    //                         className={s.timeInput}
    //                         value={values.time}
    //                         onChange={(e) => setFieldValue("time", e.target.value)}
    //                       />
    //                       <Clock
    //                         className={s.timeOutline}
    //                         onClick={() =>
    //                           timeRef.current?.showPicker?.() ||
    //                           timeRef.current?.click()
    //                         }
    //                       />
    //                     </div>
    //                     <ErrorMessage
    //                       name="time"
    //                       component="div"
    //                       className={s.ErrorMessage}
    //                     />
    //                   </label>
  );
};

export default TimeField;
