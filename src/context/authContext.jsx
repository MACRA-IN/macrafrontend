import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("snak_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const loginUser = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("snak_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("snak_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
