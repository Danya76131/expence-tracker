import { useState, useRef } from "react";
import Logo from "../../../Logo/Logo";
import TransactionsHistoryNav from "../../../TransactionsHistoryNav/TransactionsHistoryNav";
import UserPanel from "../../../UserPanel/UserPanel";
import BurgerMenuBtn from "../../../BurgerMenuBtn/BurgerMenuBtn";
import BurgerMenu from "../../../BurgerMenu/BurgerMenu";
import css from "./Authenticated.module.css";

const Authenticated = ({ userData, handleLogout, openUserSetsModal }) => {
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const userBarBtnRef = useRef(null);

  const toggleUserPanel = () => {
    setIsUserPanelOpen((prev) => !prev);
  };

  const openBurgerMenu = () => {
    setIsBurgerMenuOpen(true);
  };

  const closeBurgerMenu = () => {
    setIsBurgerMenuOpen(false);
  };

  return (
    <>
      <header className={css.header}>
        <Logo />

        {/* ТІЛЬКИ ДЛЯ ДЕСКТОПУ */}
        <div className={css.desktopOnly}>
          <TransactionsHistoryNav />
          <UserPanel
            openUserSetsModal={openUserSetsModal}
            handleLogout={handleLogout}
            isUserPanelOpen={isUserPanelOpen}
            toggleUserPanel={toggleUserPanel}
            userBarBtnRef={userBarBtnRef.current}
            userData={userData}
          />
        </div>

        {/* ТІЛЬКИ ДЛЯ МОБІЛКИ ТА ПЛАНШЕТУ */}
        <div className={css.tabletMobileOnly}>
          <BurgerMenuBtn onClick={openBurgerMenu} />
        </div>
      </header>

      {/* БУРГЕР МЕНЮ ДЛЯ МОБІЛКИ ТА ПЛАНШЕТУ */}
      <BurgerMenu
        isOpen={isBurgerMenuOpen}
        onClose={closeBurgerMenu}
        userData={userData}
        onLogout={handleLogout}
        onOpenSettings={openUserSetsModal}
      />
    </>
  );
};

export default Authenticated;
