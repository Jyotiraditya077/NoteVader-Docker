import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authChanged, setAuthChanged] = useState(false); // NEW

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserRaw = localStorage.getItem("user");

    if (storedToken && storedUserRaw && storedUserRaw !== "undefined") {
      try {
        const storedUser = JSON.parse(storedUserRaw);
        setToken(storedToken);
        setUser(storedUser);
      } catch (err) {
        console.error("Invalid user JSON in localStorage:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (token, userInfo) => {
    setToken(token);
    setUser(userInfo);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userInfo));
    setAuthChanged((prev) => !prev); // trigger change
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthChanged((prev) => !prev); // trigger change
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,
        authChanged // expose this
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
