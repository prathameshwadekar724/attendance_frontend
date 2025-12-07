import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import api from "../services/api";

export default function PrivateRoute({ children }) {
  const { user, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        logout();
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/verify", {
          headers: { Authorization: "Bearer " + token },
        });

        if (res.data.status === 1) {
          setIsValid(true);
        } else {
          logout();
        }
      } catch (err) {
        logout();
      }

      setLoading(false);
    };

    verifyToken();
  }, []);

  if (loading) return <p className="text-white">Checking authentication...</p>;

  if (!isValid) return <Navigate to="/login" />;

  return children;
}
