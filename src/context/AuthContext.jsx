import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        // Try to parse the user. If this fails, it jumps to 'catch'
        setUser(JSON.parse(storedUser)); 
      } catch (error) {
        // If JSON is corrupt, clear it so we don't get stuck
        console.error("Corrupt user data found, logging out.");
        localStorage.clear();
        setUser(null);
      }
    }
    
    // This ensures loading ALWAYS turns false, so the screen doesn't stay white
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

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}