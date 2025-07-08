import { useState, useRef } from "react";

import Logo from "../../../Logo/Logo";
import UserBarBtn from "../../../UserBarBtn/UserBarBtn";
import UserPanel from "../../../UserPanel/UserPanel";
import TransactionsHistoryNav from "../../../TransactionsHistoryNav/TransactionsHistoryNav";
import BurgerMenuBtn from "../../../BurgerMenuBtn/BurgerMenuBtn";
import BurgerMenu from "../../../BurgerMenu/BurgerMenu";
import UserSetsModal from "../../../UserSetsModal/UserSetsModal";

import css from "./Authenticated.module.css";

const Authenticated = ({ firstName, lastName, avatar, logOut }) => {
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isUserSetsModalOpen, setIsUserSetsModalOpen] = useState(false);

  const userBarBtnRef = useRef(null);

  const userData = { firstName, lastName, avatar };

  const toggleUserPanel = () => {
    setIsUserPanelOpen((prev) => !prev);
  };

  const openUserSetsModal = () => {
    setIsUserSetsModalOpen(true);
  };

  const handleLogout = () => {
    if (logOut) {
      logOut();
    } else {
      alert("Логіка виходу");
    }
    setIsUserPanelOpen(false);
    setIsBurgerOpen(false);
  };

  const toggleBurgerMenu = () => {
    if (isUserPanelOpen) setIsUserPanelOpen(false);
    setIsBurgerOpen((prev) => !prev);
  };

  const closeUserSetsModal = () => {
    setIsUserSetsModalOpen(false);
  };

  const closeBurgerMenu = () => {
    setIsBurgerOpen(false);
    setIsUserPanelOpen(false);
  };

  return (
    <header className={css.wrapper}>
      <Logo />

      {/* Desktop */}
      <div className={css.navDesktop}>
        <TransactionsHistoryNav />
      </div>
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

      {/* Mobile / Tablet */}
      <div className={css.navMobile}>
        <BurgerMenuBtn onClick={toggleBurgerMenu} />
        <BurgerMenu
          isOpen={isBurgerOpen}
          onClose={closeBurgerMenu}
          firstName={firstName}
          lastName={lastName}
          toggleUserPanel={toggleUserPanel}
          isUserPanelOpen={isUserPanelOpen}
          openUserSetsModal={openUserSetsModal}
          handleLogout={handleLogout}
          userBarBtnRef={userBarBtnRef}
        />
      </div>
      {isUserSetsModalOpen && (
        <UserSetsModal
          isOpen={isUserSetsModalOpen}
          onClose={closeUserSetsModal}
          userData={{ firstName, lastName, avatar }}
        />
      )}
    </header>
  );
};

export default Authenticated;
