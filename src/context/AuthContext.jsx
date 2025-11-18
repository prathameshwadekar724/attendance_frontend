import { createContext, useState, useEffect } from "react";
// You don't strictly need useNavigate here unless you use it inside login/logout functions

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // 1. Add a loading state, start as TRUE
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // 2. Once we have checked localStorage, we are done loading
    setLoading(false);
  }, []);

  const login = (payload) => {
    const { token, data } = payload;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  // 3. Pass loading to the provider
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}