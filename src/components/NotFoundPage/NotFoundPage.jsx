import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Сторінку не знайдено</p>
      <Link to="/" className={styles.homeLink}>
        На головну
      </Link>
    </div>
  );
};

export default NotFoundPage;
