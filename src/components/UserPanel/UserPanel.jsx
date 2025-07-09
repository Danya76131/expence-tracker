import React, { useEffect, useRef } from "react";
import css from "./UserPanel.module.css";
import Icon from "../UI/Icon/Icon";

const UserPanel = ({
  openUserSetsModal,
  onOpenLogoutModal,
  isUserPanelOpen,
  toggleUserPanel,
  userBarBtnRef,
  isBurger = false,
}) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (isBurger) return;

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

  const handleOpenUserSets = () => {
    openUserSetsModal();
    toggleUserPanel();
  };

  const handleLogoutClick = () => {
    toggleUserPanel();
    setTimeout(() => {
      onOpenLogoutModal();
    }, 300);
  };

  const panelClassName = isBurger
    ? css.mobileWrapper
    : `${css.wrapper} ${isUserPanelOpen ? css.wrapperOpen : css.wrapperClosed}`;

  return (
    <div ref={panelRef} className={panelClassName}>
      <button onClick={handleOpenUserSets} className={css.button} type="button">
        <Icon
          name="user"
          size={16}
          stroke="currentColor"
          className={css.icon}
        />
        <span>Profile settings</span>
      </button>

      <button onClick={handleLogoutClick} className={css.button} type="button">
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
