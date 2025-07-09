import React from "react";
import css from "./LogoutModal.module.css";
import Icon from "../UI/Icon/Icon";
import Button from "../UI/Button/Button";

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onCancel}
          aria-label="Close logout modal"
        >
          <Icon name="close" size={24} stroke="white" />
        </button>

        <p className={css.text}>Are you sure you want to log out?</p>

        <div className={css.actions}>
          <Button type="button" onClick={onConfirm}>
            Log out
          </Button>
          <Button variant="dark" type="button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
