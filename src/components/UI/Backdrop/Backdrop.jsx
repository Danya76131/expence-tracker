import { useEffect } from "react";
import styles from "./Backdrop.module.css";
import Icon from "../Icon/Icon";

/**
 * Backdrop — універсальний напівпрозорий фон для модальних вікон або попапів.
 *
 * Призначення:
 * - Покриває весь екран та центрує контент
 * - Закриває вікно при натисканні Escape (якщо передано onClose)
 * - Закриває при кліку на фон (за межами контенту)
 *
 * Як використовувати:
 * <Backdrop onClose={handleClose}>
 *   <MyModal />
 * </Backdrop>
 *
 * Пропси:
 * @param {function} [onClose] — функція закриття модалки
 * @param {React.ReactNode} children — вміст модального вікна
 * @param {number} [zIndex=1000] — z-index для стекування (можна використовувати в системі модалок)
 *
 * Примітки:
 * - Подія кліку всередині вікна не закриває модалку (stopPropagation)
 * - Може використовуватись як окремий компонент або як частина ModalRoot
 */

/**
 * Backdrop — a reusable full-screen dimmed overlay for modals or popups.
 *
 * Purpose:
 * - Covers the entire screen and centers the content
 * - Closes on Escape key press (if onClose is provided)
 * - Closes on backdrop click (outside the modal content)
 *
 * Usage example:
 * <Backdrop onClose={handleClose}>
 *   <MyModal />
 * </Backdrop>
 *
 * Props:
 * @param {function} [onClose] — callback to close the modal
 * @param {React.ReactNode} children — content inside the modal
 * @param {number} [zIndex=1000] — optional stacking order (useful in modal stacks)
 *
 * Notes:
 * - Internal clicks are protected with stopPropagation
 * - Can be used standalone or inside a modal system like ModalRoot
 */

const Backdrop = ({ children, onClose, zIndex = 1000 }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && typeof onClose === "function") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);
  return (
    <div className={styles.backdrop} onClick={onClose} style={{ zIndex }}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <Icon className={styles.icon} name="close" size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Backdrop;
