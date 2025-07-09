
import { useSelector } from "react-redux";
import Container from "../Container/Container";
import { useAuth } from "./hooks";
import Authenticated from "./variants/Authenticated/Authenticated";
import Unauthenticated from "./variants/Unauthenticated/Unauthenticated";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useEffect } from "react";

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
