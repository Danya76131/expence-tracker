import React, { forwardRef } from "react";
import Icon from "../UI/Icon/Icon";
import css from "./UserBarBtn.module.css";

const UserBarBtn = forwardRef(
  ({ userData = {}, toggleUserPanel, isUserPanelOpen }, ref) => {
    const userInitial = userData.firstName
      ? userData.firstName.charAt(0).toUpperCase()
      : "?";

    // const userName =
    //   userData.firstName && userData.lastName
    //     ? `${userData.firstName} ${userData.lastName}`
    //     : "Unknown User";

    const userName = userData.firstName
      ? `${userData.firstName} ${userData.lastName || ""}`.trim()
      : "Unknown User";

    const arrowIconId = isUserPanelOpen ? (
      <Icon
        name="chevron-up"
        stroke="#0EF387"
        className={css.chevronIcon}
        aria-hidden="true"
      />
    ) : (
      <Icon
        name="chevron-down"
        stroke="#0EF387"
        className={css.chevronIcon}
        aria-hidden="true"
      />
    );

    return (
      <button onClick={toggleUserPanel} className={css.wrapper} ref={ref}>
        <div className={css.userInfo}>
          {userData.avatar ? (
            <img
              src={userData.avatar}
              alt="User avatar"
              className={css.avatar}
            />
          ) : (
            <div className={css.initial}>{userInitial}</div>
          )}
          <span className={css.userName}>{userName}</span>
        </div>
        {arrowIconId}
      </button>
    );
  }
);

export default UserBarBtn;
