import { useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return {
    isAuthenticated,
    user: isAuthenticated ? { firstName: "Alex", lastName: "Rybachok" } : null,
    logOut: () => setIsAuthenticated(false),
  };
};
