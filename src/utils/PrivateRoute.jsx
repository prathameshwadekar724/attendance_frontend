import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function PrivateRoute({ children }) {
  // 1. Get loading from context
  const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  // 2. If React is still checking localStorage, show nothing (or a spinner)
  // This prevents the premature redirect
  if (loading) {
    return null; // or return <div className="spinner">Loading...</div>
  }

  // 3. Now that loading is false, we can safely check credentials
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}