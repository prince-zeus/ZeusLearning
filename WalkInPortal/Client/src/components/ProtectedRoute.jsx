import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FourZeroFourPage } from "../pages/FourZeroFourPage";

export const ProtectedRoute = () => {
  const outlet = useOutlet();
  const { user, is2FAVerified, isAdmin } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }
  if (!is2FAVerified) {
    return <Navigate to="/verify-2fa" />;
  }

  if(!isAdmin) {
    return <FourZeroFourPage />;
  }

  return outlet;
};

export default ProtectedRoute;