import { useState } from "react";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  let firstName = "";
  let lastName = "";

  if (isLoggedIn) {
    try {
      const persistAuth = localStorage.getItem("persist:auth");
      if (persistAuth) {
        const parsed = JSON.parse(persistAuth);
        const user = JSON.parse(parsed.user);
        const nameParts = (user.name || "").trim().split(" ");
        firstName = nameParts[0] || "";
        lastName = nameParts.slice(1).join(" ") || "";
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
  }

  const logOut = () => setIsAuthenticated(false);

  return {
    isLoggedIn,
    user: isLoggedIn ? { firstName, lastName } : null,
    logOut,
  };
};
