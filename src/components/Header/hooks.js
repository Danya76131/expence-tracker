import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import { userLogout } from "../../redux/auth/operations";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const firstName = user?.name?.split(" ")[0] || "";
  const lastName = user?.name?.split(" ").slice(1).join(" ") || "";
  // const avatarUrl = user?.avatarUrl || null;
  const logOut = () => dispatch(userLogout());

  return {
    isLoggedIn,
    user: isLoggedIn
      ? {
          firstName,
          lastName,
          // avatarUrl,
          currency: user?.currency || "UAH",
          name: user?.name,
        }
      : null,
    logOut,
  };
};
