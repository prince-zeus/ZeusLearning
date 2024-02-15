import { Navigate, useLocation, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
  const { user, is2FAVerified } = useAuth();
  const outlet = useOutlet();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{from: location?.pathname || "/"}} />;
  }

  if (!is2FAVerified) {
    return <Navigate to="/verify-2fa" state={{from: location?.pathname || "/"}} replace />
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Profile", path: "profile" }
        ]}
      />
      {outlet}
    </div>
  );
};
