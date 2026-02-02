import { useContext } from "react";
import { Navigate } from "react-router-dom"; 
import { AuthContext } from "./context/AuthContext"; 

/**
 * ProtectedRoute Component.
 * Wraps route components to enforce authentication.
 * Redirects unauthenticated users to the login page.
 */
export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
