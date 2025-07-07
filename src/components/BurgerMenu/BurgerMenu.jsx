import { useEffect } from "react";
import css from "./BurgerMenu.module.css";
import TransactionsHistoryNav from "../TransactionsHistoryNav/TransactionsHistoryNav";
import UserBarBtn from "../UserBarBtn/UserBarBtn";
import UserPanel from "../UserPanel/UserPanel";

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

  return (
    <>
      <div className={css.backdrop} onClick={onClose} />
      <nav className={css.menu}>
        <TransactionsHistoryNav />
        <div className={css.userBarBtn}>
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
      </nav>
    </>
  );
};

export default BurgerMenu;
