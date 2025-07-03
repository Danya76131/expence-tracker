import CategoriesModal from "../../components/CategoriesModal/CategoriesModal";
import styles from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <div className={styles.wrapper}>
      <CategoriesModal />
    </div>
  );
};

export default WelcomePage;
