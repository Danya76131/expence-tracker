import toast from 'react-hot-toast';
import styles from './CustomToast.module.css';

const showSuccessToast = (msg) => {
  toast(
    <span className={styles.toastBase}> {msg}</span>,
    {
      className: `${styles.toastWrapper} ${styles.toastWrapperSuccess}`,
      bodyClassName: styles.toastBody,
      hideProgressBar: true,
      duration: 3000,
      position: 'top-right',
    }
  );
};

const showErrorToast = (msg) => {
  toast(
    <span className={styles.toastBase}> {msg}</span>,
    {
      className: `${styles.toastWrapper} ${styles.toastWrapperError}`,
      bodyClassName: styles.toastBody,
      hideProgressBar: true,
      duration: 3000,
      position: 'top-right',
    }
  );
};

export { showSuccessToast, showErrorToast };
