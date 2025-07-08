import Container from "../Container/Container";
import { useAuth } from "./hooks";
import Authenticated from "./variants/Authenticated/Authenticated";
import Unauthenticated from "./variants/Unauthenticated/Unauthenticated";

const Header = () => {
  const { isAuthenticated, user, logOut } = useAuth();

  if (isAuthenticated) {
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
