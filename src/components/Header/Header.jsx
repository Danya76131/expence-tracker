import { useAuth } from "./hooks";
import Container from "../Container/Container";
import Authenticated from "./variants/Authenticated/Authenticated";
import Unauthenticated from "./variants/Unauthenticated/Unauthenticated";

const Header = () => {
  const { isLoggedIn, user, logOut } = useAuth();

  if (isLoggedIn) {
    return (
      <Container>
        <Authenticated
          firstName={user.firstName}
          lastName={user.lastName}
          logOut={logOut}
        />
      </Container>
    );
  }

  return <Unauthenticated />;
};

export default Header;
