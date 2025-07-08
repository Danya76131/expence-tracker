import React from "react";
import PropTypes from "prop-types";
import Button from "../UI/Button/Button";
import Icon from "../UI/Icon/Icon";
import css from "./UserSetsModal.module.css";

const CloseButton = ({ onClick }) => {
  return (
    <Button className={css.closeBtn} onClick={onClick} aria-label="Close modal">
      <Icon name="close" className={css.closeIcon} />
    </Button>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CloseButton;
