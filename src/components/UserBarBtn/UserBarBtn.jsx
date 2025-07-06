import css from "./UserBarBtn.module.css";

const SPRITE_PATH = "../../assets/icons/sprite.svg";

const UserBarBtn = ({ userData = {}, toggleUserPanel, isUserPanelOpen }) => {
  const userInitial = userData.firstName
    ? userData.firstName.charAt(0).toUpperCase()
    : "?";

  const userName =
    userData.firstName && userData.lastName
      ? `${userData.firstName} ${userData.lastName}`
      : "Unknown User";

  const arrowIconId = isUserPanelOpen ? "arrow-up" : "arrow-down";

  return (
    <button onClick={toggleUserPanel} className={css.wrapper}>
      <div className={css.userInfo}>
        {userData.avatar ? (
          <img src={userData.avatar} alt="User avatar" className={css.avatar} />
        ) : (
          <div className={css.initial}>{userInitial}</div>
        )}
        <span className={css.userName}>{userName}</span>
      </div>
      <svg className={css.arrowIcon} width="16" height="16" aria-hidden="true">
        <use href={`${SPRITE_PATH}#${arrowIconId}`} />
      </svg>
    </button>
  );
};

export default UserBarBtn;
