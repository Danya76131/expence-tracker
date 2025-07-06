import Icon from "../UI/Icon/Icon";
import css from "./BurgerMenuBtn.module.css";

const BurgerMenuBtn = ({ onClick }) => {
  return (
    <button className={css.wrapper} onClick={onClick} type="button">
      <Icon
        name="burger-menu"
        size={30}
        fill="currentColor"
        className={css.burger}
      />
    </button>
  );
};

export default BurgerMenuBtn;
