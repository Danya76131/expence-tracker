import { useState, useRef } from "react";

import Logo from "../../../Logo/Logo";
import UserBarBtn from "../../../UserBarBtn/UserBarBtn";
import UserPanel from "../../../UserPanel/UserPanel";
import TransactionsHistoryNav from "../../../TransactionsHistoryNav/TransactionsHistoryNav";
import BurgerMenuBtn from "../../../BurgerMenuBtn/BurgerMenuBtn";
import BurgerMenu from "../../../BurgerMenu/BurgerMenu";
import UserSetsModal from "../../../UserSetsModal/UserSetsModal";
import LogOutModal from "../../../LogOutModal/LogOutModal";

import css from "./Authenticated.module.css";

const Authenticated = ({ firstName, lastName, avatar, logOut }) => {
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isUserSetsModalOpen, setIsUserSetsModalOpen] = useState(false);
  const [showLogOutModal, setShowLogOutModal] = useState(false);

  const userBarBtnRef = useRef(null);

  const userData = { firstName, lastName, avatar };

  const toggleUserPanel = () => {
    setIsUserPanelOpen((prev) => !prev);
  };

  const openUserSetsModal = () => {
    setIsUserSetsModalOpen(true);
  };

  const closeUserSetsModal = () => {
    setIsUserSetsModalOpen(false);
  };

  const openLogOutModal = () => {
    setShowLogOutModal(true);
  };

  const closeLogOutModal = () => {
    setShowLogOutModal(false);
  };

  const handleLogout = () => {
    if (logOut) {
      logOut();
    } else {
      alert("Логіка виходу");
    }
    setShowLogOutModal(false);
    setIsUserPanelOpen(false);
    setIsBurgerOpen(false);
  };

  const toggleBurgerMenu = () => {
    if (isUserPanelOpen) setIsUserPanelOpen(false);
    setIsBurgerOpen((prev) => !prev);
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
          onOpenLogoutModal={openLogOutModal}
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
          onOpenLogoutModal={openLogOutModal}
          handleLogout={handleLogout}
          userBarBtnRef={userBarBtnRef}
        />
      </div>

      {/* Модалки */}
      {isUserSetsModalOpen && (
        <UserSetsModal
          isOpen={isUserSetsModalOpen}
          onClose={closeUserSetsModal}
          userData={{ firstName, lastName, avatar }}
        />
      )}

      {showLogOutModal && (
        <LogOutModal
          isOpen={showLogOutModal}
          onCancel={closeLogOutModal}
          onConfirm={handleLogout}
        />
      )}
    </header>
  );
};

export default Authenticated;
