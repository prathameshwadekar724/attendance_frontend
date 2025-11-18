import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  // 1. If context is still loading, show nothing (or a spinner)
  // Do NOT redirect yet.
  if (loading) {
    return null; 
  }

  // 2. Now that loading is false, check authentication
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}