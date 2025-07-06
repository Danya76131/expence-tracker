import { useState } from "react";
import Logo from "../../../Logo/Logo";
import Button from "../../../UI/Button/Button";
import UserBarBtn from "../../../UserBarBtn/UserBarBtn";
import UserPanel from "../../../UserPanel/UserPanel";
import css from "./Authenticated.module.css";

const Authenticated = ({ firstName, lastName, avatar, logOut }) => {
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);

  const toggleUserPanel = () => {
    setIsUserPanelOpen((prev) => !prev);
  };

  const openUserSetsModal = () => {
    alert("Відкриваємо модалку налаштувань профілю");
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
      <div className={css.centerButtons}>
        <Button>All Expense</Button>
        <Button variant="secondary">All Income</Button>
      </div>
      <div className={css.userBarBtn}>
        <UserBarBtn
          userData={userData}
          toggleUserPanel={toggleUserPanel}
          isUserPanelOpen={isUserPanelOpen}
        />
        <UserPanel
          openUserSetsModal={openUserSetsModal}
          handleLogout={handleLogout}
          isUserPanelOpen={isUserPanelOpen}
          toggleUserPanel={toggleUserPanel}
        />
      </div>
    </div>
  );
};

export default Authenticated;
