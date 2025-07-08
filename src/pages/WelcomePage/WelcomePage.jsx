import css from "./WelcomePage.module.css";
import BgImageWrapper from "../../components/BgImageWrapper/BgImageWrapper";
import AuthNav from "../../components/Layout/AuthNav";
import AllUsersTab from "../../components/AllUsersTab/AllUsersTab";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
// import {selectAuthLoading} from '../redux/auth/selectors';
// імпорт для лоадера

function WelcomePage() {
  // const isLoading = useSelector(state => state.auth.isLoading);
  return (
    <AnimatedPage>
      <div className={css.pageStyle}>
        <div className={css.infoWrapp}>
          <h2 className={css.miniTitle}>Expense log</h2>
          <h1 className={css.mainTitle}>
            Manage Your <span className={css.mainTitleSpan}>Finances</span>{" "}
            Masterfully!
          </h1>
          <p className={css.aboutApp}>
            ExpenseTracker effortlessly empowers you to take control of your
            finances! With intuitive features, it simplifies the process of
            tracking and managing expenses, allowing for a stress-free mastery
            over your financial world.
          </p>
          <AuthNav />
          <AllUsersTab />
        </div>

        <BgImageWrapper />
      </div>
    </AnimatedPage>
  );
}

export default WelcomePage;
