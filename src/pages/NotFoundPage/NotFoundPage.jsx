import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Page is not found</p>
      <Link to="/" className={styles.homeLink}>
        Go home
      </Link>
    </div>
  );
};

export default NotFoundPage;
