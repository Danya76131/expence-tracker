import { toast } from 'react-toastify';
import styles from './CustomToast.module.css';

const showSuccessToast = (msg) => {
  toast(
    <span className={styles.toastBase}>{msg}</span>,
    {
      className: `${styles.toastWrapper} ${styles.toastWrapperSuccess}`,
      bodyClassName: styles.toastBody,
      hideProgressBar: true,
      
    }
  );
};

const showErrorToast = (msg) => {
  toast(
    <span className={styles.toastBase}>{msg}</span>,
    {
      className: `${styles.toastWrapper} ${styles.toastWrapperError}`,
      bodyClassName: styles.toastBody,
      hideProgressBar: true,
      
    }
  );
};

export { showSuccessToast, showErrorToast };