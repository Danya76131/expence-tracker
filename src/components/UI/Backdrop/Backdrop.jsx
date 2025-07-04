import styles from "./Backdrop.module.css";

/**
 * Backdrop — a simple full-screen dimmed background for modals.
 *
 * It does not handle closing logic (click or Escape).
 * Use it to wrap modal content and handle closing inside the content itself.
 *
 * Example:
 * <Backdrop>
 *   <ModalContent onClose={...} />
 * </Backdrop>
 */

const Backdrop = ({ children }) => {
  return <div className={styles.backdrop}>{children}</div>;
};

export default Backdrop;
