import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  // 1. Get the user from the AuthContext (which now reads from LocalStorage)
  const { user } = useContext(AuthContext);

  // 2. If no user is found, kick them to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 3. If user exists, allow them to see the protected page
  return children;
};

export default PrivateRoute;