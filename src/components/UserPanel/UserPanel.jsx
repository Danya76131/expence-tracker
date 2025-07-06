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
  userData,
  insideBurger = false,
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserPanelOpen, toggleUserPanel, userBarBtnRef]);

  return (
    <div className={insideBurger ? css.burgerWrapper : css.panelWrapper}>
      <UserBarBtn
        toggleUserPanel={toggleUserPanel}
        isUserPanelOpen={isUserPanelOpen}
        userBarBtnRef={userBarBtnRef}
        userData={userData}
      />
      {isUserPanelOpen && (
        <div ref={dropdownRef}>
          <Backdrop
            openUserSetsModal={openUserSetsModal}
            handleLogout={handleLogout}
          />
        </div>
      )}
    </div>
  );
};

export default UserPanel;
