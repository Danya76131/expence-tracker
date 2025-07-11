import styles from "./CustomToast.module.css";

const ShowSuccessToast = ({ msg }) => {
  return <div className={styles.toastWrapperSuccess}> {msg}</div>;
};
const ShowErrorToast = ({ msg }) => {
  return <div className={styles.toastWrapperError}> {msg}</div>;
};

export { ShowSuccessToast, ShowErrorToast };
