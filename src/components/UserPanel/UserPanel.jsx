import React, { useEffect, useRef } from "react";
import css from "./UserPanel.module.css";
import Icon from "../UI/Icon/Icon";

const UserPanel = ({
  openUserSetsModal,
  handleLogout,
  isUserPanelOpen,
  toggleUserPanel,
  userBarBtnRef, // реф на кнопку
}) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        userBarBtnRef.current &&
        !userBarBtnRef.current.contains(event.target)
      ) {
        // Клік поза панеллю і поза кнопкою - закриваємо панель
        toggleUserPanel();
      }
    };

    if (isUserPanelOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserPanelOpen, toggleUserPanel, userBarBtnRef]);

  return (
    <div
      ref={panelRef}
      className={`${css.wrapper} ${
        isUserPanelOpen ? css.wrapperOpen : css.wrapperClosed
      }`}
    >
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
