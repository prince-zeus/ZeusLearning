import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { user, is2FAVerified } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }
  if (!is2FAVerified) {
    return <Navigate to="/verify-2fa" />;
  }

  return children;
};

export default ProtectedRoute;