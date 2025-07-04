import styles from "./Backdrop.module.css";

const Backdrop = ({ onClose, children }) => {
  return <div className={styles.backdrop}></div>;
};

export default Backdrop;
