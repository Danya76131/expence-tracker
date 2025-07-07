import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { Calendar, Clock } from "lucide-react";
import s from "./TransactionForm.module.css";
import { useRef } from "react";

import CategoriesModal from "../CategoriesModal/CategoriesModal";
import { useDispatch } from "react-redux";
import { parseISO, isValid, isFuture, startOfDay } from "date-fns";
import { addTransaction } from "../../redux/transactions/operations";

const transactionFormSchema = Yup.object().shape({
  type: Yup.string()
    .required("Transaction type is required")
    .oneOf(["incomes", "expenses"]),

  date: Yup.string()
    .required("Date is required")
    .test("is-valid-date", "Invalid date", function (value) {
      if (!value) return true;
      const parsedDate = parseISO(value);
      return (
        isValid(parsedDate) || this.createError({ message: "Invalid date" })
      );
    })
    .test(
      "is-not-future-date",
      "Date cannot be in the future",
      function (value) {
        if (!value) return true;
        const parsedDate = parseISO(value);
        return (
          !isFuture(startOfDay(parsedDate)) ||
          this.createError({ message: "Date cannot be in the future" })
        );
      }
    ),

  time: Yup.string()
    .required("Time is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),

  category: Yup.string().required("Category is required"),

  sum: Yup.number()
    .required("Amount is required")
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .max(1_000_000, "Amount is too large (max 1,000,000)")
    .test(
      "two-decimal-places",
      "Amount can have up to two decimal places",
      (value) => {
        if (value === null || value === undefined) return true;
        return /^\d+(.\d{1,2})?$/.test(value.toString());
      }
    ),

  comment: Yup.string()
    .min(3, "Comment cannot be less then 3 characters")
    .max(48, "Comment must be less than or equal to 48 characters long"),
});

const initialValues = {
  type: "expenses",
  date: "",
  time: "00:00:00",
  category: "",
  sum: "",
  comment: "",
};

const TransactionForm = ({ type }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectCategory, setSelectCategory] = useState(null);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log(values);
      await dispatch(addTransaction(values)).unwrap();
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
        validationSchema={transactionFormSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className={s.formikForm}>
            {/* Radio */}
            <div className={s.radioGroup}>
              <label htmlFor="expenses" className={s.radioLabel}>
                <Field
                  id="expenses"
                  type="radio"
                  name="type"
                  value="expenses"
                />
                {values.type === "expenses" ? (
                  <MdRadioButtonChecked className={s.radioButtonActive} />
                ) : (
                  <MdRadioButtonUnchecked className={s.radioButton} />
                )}
                <span className={s.radioSpan}>Expense</span>
              </label>

              <label htmlFor="incomes" className={s.radioLabel}>
                <Field id="incomes" type="radio" name="type" value="incomes" />
                {values.type === "incomes" ? (
                  <MdRadioButtonChecked className={s.radioButtonActive} />
                ) : (
                  <MdRadioButtonUnchecked className={s.radioButton} />
                )}
                <span className={s.radioSpan}>Income</span>
              </label>
            </div>
            <ErrorMessage
              name="type"
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
                    />
                    <Calendar
                      className={s.calendar}
                      onClick={() =>
                        dateRef.current?.showPicker?.() ||
                        dateRef.current?.click()
                      }
                    />
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
                    />
                    <Clock
                      className={s.timeOutline}
                      onClick={() =>
                        timeRef.current?.showPicker?.() ||
                        timeRef.current?.click()
                      }
                    />
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

            <label htmlFor="categoryInput" className={s.label}>
              Category
            </label>
            <input
              readOnly
              id="categoryInput"
              name="categoryInput"
              placeholder="Select category"
              type="text"
              value={selectCategory || "Select category"}
              className={s.categoryInput}
              onClick={() => setModalOpen(true)}
            />

            <Field
              type="hidden"
              name="category"
              id="category"
              aria-label="Selected Category ID"
            />

            <ErrorMessage className={s.error} name="category" component="div" />

            {/* Sum */}

            <label htmlFor="sum" className={`${s.labelx} ${s.label}`}>
              <span className={s.nameInputOther}>Sum</span>
              <div className={s.inputWrapperSum}>
                <Field
                  id="sum"
                  name="sum"
                  type="number"
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

            <label htmlFor="comment" className={`${s.labelc} ${s.label}`}>
              <span className={s.nameInputOther}>Comment</span>
              <Field
                id="comment"
                as="textarea"
                name="comment"
                placeholder="Enter the text"
                className={s.commentInput}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={s.ErrorMessage}
              />
            </label>

            {/* Submit */}
            <button type="submit" className={s.submitButton}>
              {isEditMode ? "Edit" : "Add"}
            </button>

            {/* Category Modal */}
            {isModalOpen && (
              <CategoriesModal
                type={values.type}
                closeModal={() => setModalOpen(false)}
                onSelect={(category) => {
                  setFieldValue("category", category._id);
                  console.log("Selected category:", category);
                  setModalOpen(false);
                  setSelectCategory(category.categoryName);
                }}
                onClose={() => setModalOpen(false)}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TransactionForm;
