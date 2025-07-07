import { useEffect } from "react";
import css from "./BurgerMenu.module.css";
import TransactionsHistoryNav from "../TransactionsHistoryNav/TransactionsHistoryNav";
import UserBarBtn from "../UserBarBtn/UserBarBtn";
import UserPanel from "../UserPanel/UserPanel";
import Icon from "../UI/Icon/Icon";

const BurgerMenu = ({
  isOpen,
  onClose,
  firstName,
  lastName,
  toggleUserPanel,
  isUserPanelOpen,
  openUserSetsModal,
  handleLogout,
  userBarBtnRef,
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCloseByClick = () => {
    onClose();
  };

  return (
    <>
      <div className={css.backdrop} onClick={onClose} />
      <nav className={css.menu}>
        <button
          className={css.closeBtn}
          onClick={handleCloseByClick}
          aria-label="Close menu"
        >
          <Icon name="close" />
        </button>

        <div className={css.userBarBtn} onClick={handleCloseByClick}>
          <UserBarBtn
            ref={userBarBtnRef}
            userData={{ firstName, lastName }}
            toggleUserPanel={toggleUserPanel}
            isUserPanelOpen={isUserPanelOpen}
          />
          <UserPanel
            openUserSetsModal={openUserSetsModal}
            handleLogout={handleLogout}
            isUserPanelOpen={isUserPanelOpen}
            toggleUserPanel={toggleUserPanel}
            userBarBtnRef={userBarBtnRef}
            isBurger={true}
          />
        </div>

        <div onClick={handleCloseByClick}>
          <TransactionsHistoryNav />
        </div>
      </nav>
    </>
  );
};

export default BurgerMenu;
