import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
// import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
// import { Calendar, Clock } from "lucide-react";
import s from "./TransactionForm.module.css";
import { useRef } from "react";

import CategoriesModal from "../CategoriesModal/CategoriesModal";

const TransactionSchema = Yup.object().shape({
  transactionType: Yup.string().required(),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  category: Yup.object().nullable().required("Category is required"),
  sum: Yup.number()
    .positive("Sum must be positive")
    .required("Sum is required"),
  comment: Yup.string(),
});

const initialValues = {
  transactionType: "expense",
  date: "",
  time: "00:00:00",
  category: null,
  sum: "",
  comment: "",
};

const TransactionForm = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // await sendTransaction(values); // реальний API виклик
      toast.success("Transaction created successfully");
      resetForm();
    } catch (e) {
      toast.error("Failed to create transaction");
    }
  };

  return (
    <div className={s.formikWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={TransactionSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className={s.formikForm}>
            {/* Radio */}
            <div className={s.radioGroup}>
              <label htmlFor="expense" className={s.radioLabel}>
                <Field
                  id="expense"
                  type="radio"
                  name="transactionType"
                  value="expense"
                />
                {values.transactionType === "expense" ? (
                  <MdRadioButtonChecked className={s.radioButtonActive} />
                ) : (
                  <MdRadioButtonUnchecked className={s.radioButton} />
                )}
                <span className={s.radioSpan}>Expense</span>
              </label>

              <label htmlFor="income" className={s.radioLabel}>
                <Field
                  id="income"
                  type="radio"
                  name="transactionType"
                  value="income"
                />
                {values.transactionType === "income" ? (
                  <MdRadioButtonChecked className={s.radioButtonActive} />
                ) : (
                  <MdRadioButtonUnchecked className={s.radioButton} />
                )}
                <span className={s.radioSpan}>Income</span>
              </label>
            </div>
            <ErrorMessage
              name="transactionType"
              component="div"
              className={s.ErrorMessage}
            />

            {/* Date & Time */}
            <div className={s.dateTimeGroup}>
              <div className={s.dateInputWrapper}>
                <label htmlFor="date" className={s.label}>
                  <span className={s.nameInput}>Date</span>
                  <div className={s.timeRelative}>
                    <Field
                      innerRef={dateRef}
                      id="date"
                      type="date"
                      name="date"
                      className={s.dateInput}
                      value="mm/dd/yyyy"
                      // value={values.date}
                      // onChange={(e) => setFieldValue("date", e.target.value)}
                    />
                    {/* <Calendar
                      className={s.calendar}
                      onClick={() =>
                        dateRef.current?.showPicker?.() ||
                        dateRef.current?.click()
                      }
                    /> */}
                  </div>
                  <ErrorMessage
                    name="date"
                    component="div"
                    className={s.ErrorMessage}
                  />
                </label>
              </div>

              <div className={s.timeInputWrapper}>
                <label htmlFor="time" className={s.label}>
                  <span className={s.nameInput}>Time</span>
                  <div className={s.timeRelative}>
                    <Field
                      innerRef={timeRef}
                      id="time"
                      type="time"
                      name="time"
                      className={s.timeInput}
                      // value={values.time}
                      // onChange={(e) => setFieldValue("time", e.target.value)}
                    />
                    {/* <Clock
                      className={s.timeOutline}
                      onClick={() =>
                        timeRef.current?.showPicker?.() ||
                        timeRef.current?.click()
                      }
                    /> */}
                  </div>
                  <ErrorMessage
                    name="time"
                    component="div"
                    className={s.ErrorMessage}
                  />
                </label>
              </div>
            </div>

            {/* Category */}

            <label htmlFor="category" className={s.label}>
              <span className={s.nameInput}>Category</span>
              <input
                readOnly
                id="category"
                className={s.categoryInput}
                placeholder="Select category"
                value={values.category?.name || "Select category"}
                onClick={() => setModalOpen(true)}
              />
              <ErrorMessage
                name="category"
                component="div"
                className={s.ErrorMessage}
              />
            </label>

            {/* Sum */}

            <label htmlFor="sum" className={s.label}>
              <span className={s.nameInputOther}>Sum</span>
              <div className={s.inputWrapperSum}>
                <Field
                  id="sum"
                  name="sum"
                  type="number"
                  step="0.1"
                  min="0.01"
                  placeholder="Enter the sum"
                  className={s.sumInput}
                />
                <span className={s.sumInputSuffix}>UAH</span>
              </div>
              <ErrorMessage
                name="sum"
                component="div"
                className={s.ErrorMessage}
              />
            </label>

            {/* Comment */}

            <label htmlFor="comment" className={s.label}>
              <span className={s.nameInputOther}>Comment</span>
              <Field
                id="comment"
                as="textarea"
                name="comment"
                placeholder="Enter the text"
                className={s.commentInput}
              />
            </label>

            {/* Submit */}
            <button type="submit" className={s.submitButton}>
              {isEditMode ? "Edit" : "Add"}
            </button>

            {/* Category Modal */}
            {/* {isModalOpen && (
              <CategoriesModal
                type={values.transactionType}
                onSelect={(category) => {
                  setFieldValue("category", category);
                  setModalOpen(false);
                }}
                onClose={() => setModalOpen(false)}
              />
            )} */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TransactionForm;
