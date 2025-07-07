import React, { useEffect, useRef } from "react";
import css from "./UserPanel.module.css";
import Icon from "../UI/Icon/Icon";

const UserPanel = ({
  openUserSetsModal,
  handleLogout,
  isUserPanelOpen,
  toggleUserPanel,
  userBarBtnRef,
  isBurger = false,
}) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (isBurger) return; // для бургер-меню не закриваємо при кліку поза

    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        userBarBtnRef.current &&
        !userBarBtnRef.current.contains(event.target)
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
