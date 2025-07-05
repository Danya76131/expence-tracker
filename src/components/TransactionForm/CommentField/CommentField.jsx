import { Field } from "formik";
import s from "./CommentField.module.css";

const CommentField = () => {
  return (
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
  );
};

export default CommentField;
