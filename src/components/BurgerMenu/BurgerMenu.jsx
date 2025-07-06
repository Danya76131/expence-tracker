import { useEffect } from "react";
import css from "./BurgerMenu.module.css";
import UserPanel from "../UserPanel/UserPanel";
import Button from "../UI/Button/Button";

const BurgerMenu = ({
  isOpen,
  onClose,
  userData,
  onLogout,
  onOpenSettings,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={`${css.overlay} ${isOpen ? css.open : ""}`}>
      <div className={css.panel}>
        <button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close menu"
        >
          ✕
        </button>

        <div className={css.content}>
          <UserPanel
            userBarBtnRef={null}
            isUserPanelOpen={true}
            toggleUserPanel={onClose}
            handleLogout={onLogout}
            openUserSetsModal={onOpenSettings}
            insideBurger={true}
            userData={userData}
          />

          <div className={css.menuButtons}>
            <Button variant="primary">All Expense</Button>
            <Button variant="secondary">All Income</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
