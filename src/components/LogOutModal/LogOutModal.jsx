import React from "react";
import css from "./LogoutModal.module.css";
import Icon from "../UI/Icon/Icon";

const LogoutModal = ({ onLogout, onCancel }) => {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onCancel}
          aria-label="Close logout modal"
        >
          <Icon name="close" size={20} stroke="white" />
        </button>

        <p className={css.text}>Are you sure you want to log out?</p>

        <div className={css.actions}>
          <button type="button" className={css.logoutBtn} onClick={onLogout}>
            Log out
          </button>
          <button type="button" className={css.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
