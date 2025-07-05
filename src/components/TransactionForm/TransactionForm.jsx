import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useRef } from "react";
import { toast } from "react-toastify";

import s from "./TransactionForm.module.css";

import CategoriesModal from "../CategoriesModal/CategoriesModal";

import TransactionType from "./TransactionType/TransactionType";
import DateField from "./DateField/DateField";
import TimeField from "./TimeField/TimeField";
import CategoryField from "./CategoryField/CategoryField";
import SumField from "./SumField/SumField";
import CommentField from "./CommentField/CommentField";

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
  date: new Date().toISOString().split("T")[0],
  time: new Date().toTimeString().slice(0, 8),
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
      // API виклик
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
            <TransactionType value={values.transactionType} />
            <div className={s.dateTimeGroup}>
              <DateField
                value={values.date}
                setFieldValue={setFieldValue}
                inputRef={dateRef}
              />
              <TimeField
                value={values.time}
                setFieldValue={setFieldValue}
                inputRef={timeRef}
              />
            </div>
            <CategoryField
              category={values.category}
              openModal={() => setModalOpen(true)}
            />
            <SumField />
            <CommentField />
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
