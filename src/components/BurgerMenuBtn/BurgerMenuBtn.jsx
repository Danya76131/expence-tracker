import Icon from "../UI/Icon/Icon";
import css from "./BurgerMenuBtn.module.css";

const BurgerMenuBtn = ({ onClick }) => {
  return (
    <button
      className={css.wrapper}
      type="button"
      aria-label="Open menu"
      onClick={onClick}
    >
      <Icon name="burger-menu" size={36} className={css.burger} />
    </button>
  );
};

export default BurgerMenuBtn;
