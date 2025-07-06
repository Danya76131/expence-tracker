import React, { useEffect, useRef } from "react";
import css from "./UserPanel.module.css";

const UserPanel = ({
  openUserSetsModal,
  handleLogout,
  isUserPanelOpen,
  toggleUserPanel,
}) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        toggleUserPanel();
      }
    };
    if (isUserPanelOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserPanelOpen, toggleUserPanel]);

  return (
    <div
      ref={panelRef}
      className={`${css.wrapper} ${
        isUserPanelOpen ? css.wrapperOpen : css.wrapperClosed
      }`}
    >
      <button onClick={openUserSetsModal} className={css.button} type="button">
        <svg className={css.icon}>
          <use href="#user" />
        </svg>
        <span>Налаштування профілю</span>
      </button>
      <button onClick={handleLogout} className={css.button} type="button">
        <svg className={css.icon}>
          <use href="#log-out" />
        </svg>
        <span>Вийти</span>
      </button>
    </div>
  );
};

export default UserPanel;
