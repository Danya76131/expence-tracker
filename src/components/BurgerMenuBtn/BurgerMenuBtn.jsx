import Button from "../UI/Button/Button";
import Icon from "../UI/Icon/Icon";
import css from "./BurgerMenuBtn.module.css";

const BurgerMenuBtn = ({ onClick }) => {
  return (
    <Button
      className={css.wrapper}
      type="button"
      aria-label="Open menu"
      onClick={onClick}
    >
      <Icon name="burger-menu" className={css.burger} />
    </Button>
  );
};

export default BurgerMenuBtn;
