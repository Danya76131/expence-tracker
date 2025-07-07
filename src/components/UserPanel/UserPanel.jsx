import { useRef, useEffect } from "react";
import UserBarBtn from "../UserBarBtn/UserBarBtn";
import css from "./UserPanel.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";

const UserPanel = ({
  openUserSetsModal,
  handleLogout,
  isUserPanelOpen,
  toggleUserPanel,
  userBarBtnRef,
  isBurger = false,
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isBurger) return; // для бургер-меню не закриваємо при кліку поза

    const handleClickOutside = (event) => {
      if (
        isUserPanelOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        userBarBtnRef &&
        !userBarBtnRef.contains(e.target)
      ) {
        toggleUserPanel();
      }
    };

    if (isUserPanelOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserPanelOpen, toggleUserPanel, userBarBtnRef, isBurger]);

  const panelClassName = isBurger
    ? css.mobileWrapper
    : `${css.wrapper} ${isUserPanelOpen ? css.wrapperOpen : css.wrapperClosed}`;

  return (
    <div ref={panelRef} className={panelClassName}>
      <button onClick={openUserSetsModal} className={css.button} type="button">
        <Icon
          name="user"
          size={16}
          stroke="currentColor"
          className={css.icon}
        />
        <span>Profile settings</span>
      </button>
      <button onClick={handleLogout} className={css.button} type="button">
        <Icon
          name="log-out"
          size={16}
          stroke="currentColor"
          className={css.icon}
        />
        <span>Log out</span>
      </button>
    </div>
  );
};

export default UserPanel;
