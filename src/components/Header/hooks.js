import { useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  let firstName = "";
  let lastName = "";

  if (isAuthenticated) {
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
    isAuthenticated,
    user: isAuthenticated ? { firstName, lastName } : null,
    logOut,
  };
};
