import { useAuth } from "./hooks";
import Authenticated from "./variants/Authenticated/Authenticated";
import Unauthenticated from "./variants/Unauthenticated/Unauthenticated";

const Header = () => {
  const { isAuthenticated, user, logOut } = useAuth();

  if (isAuthenticated) {
    return (
      <Authenticated
        firstName={user.firstName}
        lastName={user.lastName}
        logOut={logOut}
      />
    );
  }

  return <Unauthenticated />;
};

export default Header;
