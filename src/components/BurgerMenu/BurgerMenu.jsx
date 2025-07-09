import { useEffect, useState } from "react";
import css from "./BurgerMenu.module.css";
import TransactionsHistoryNav from "../TransactionsHistoryNav/TransactionsHistoryNav";
import UserBarBtn from "../UserBarBtn/UserBarBtn";
import UserPanel from "../UserPanel/UserPanel";
import Icon from "../UI/Icon/Icon";
import Button from "../UI/Button/Button";
import LogoutModal from "../LogOutModal/LogOutModal";

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
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  const onOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    handleLogout();
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div className={css.backdrop} onClick={onClose} />
      <nav className={css.menu}>
        <Button
          className={css.closeBtn}
          onClick={handleCloseByClick}
          aria-label="Close menu"
        >
          <Icon name="close" className={css.closeIcon} />
        </Button>

        <div className={css.userBarBtn} onClick={handleCloseByClick}>
          <UserBarBtn
            ref={userBarBtnRef}
            userData={{ firstName, lastName }}
            toggleUserPanel={toggleUserPanel}
            isUserPanelOpen={isUserPanelOpen}
          />
          <UserPanel
            openUserSetsModal={openUserSetsModal}
            onOpenLogoutModal={onOpenLogoutModal}
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

      {showLogoutModal && (
        <LogoutModal onConfirm={confirmLogout} onCancel={cancelLogout} />
      )}
    </>
  );
};

export default BurgerMenu;
