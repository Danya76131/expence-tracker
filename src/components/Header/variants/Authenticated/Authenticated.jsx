import { useState, useRef } from "react";
import Logo from "../../../Logo/Logo";
import Button from "../../../UI/Button/Button";
import UserBarBtn from "../../../UserBarBtn/UserBarBtn";
import UserPanel from "../../../UserPanel/UserPanel";
import css from "./Authenticated.module.css";
import TransactionsHistoryNav from "../../../TransactionsHistoryNav/TransactionsHistoryNav";

const Authenticated = ({ firstName, lastName, avatar, logOut }) => {
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const userBarBtnRef = useRef(null);

  const toggleUserPanel = () => {
    setIsUserPanelOpen((prev) => !prev);
  };

  const openUserSetsModal = () => {
    alert("Тут буде модалка ))");
  };

  const handleLogout = () => {
    if (logOut) {
      logOut();
    } else {
      alert("Логіка виходу");
    }
  };

  const userData = { firstName, lastName, avatar };

  return (
    <div className={css.wrapper} style={{ position: "relative" }}>
      <Logo />
      <TransactionsHistoryNav />
      <div className={css.userBarBtn}>
        <UserBarBtn
          ref={userBarBtnRef}
          userData={userData}
          toggleUserPanel={toggleUserPanel}
          isUserPanelOpen={isUserPanelOpen}
        />
        <UserPanel
          openUserSetsModal={openUserSetsModal}
          handleLogout={handleLogout}
          isUserPanelOpen={isUserPanelOpen}
          toggleUserPanel={toggleUserPanel}
          userBarBtnRef={userBarBtnRef}
        />
      </div>
    </div>
  );
};

export default Authenticated;
