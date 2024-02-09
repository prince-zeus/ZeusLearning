import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
  const { user, is2FAVerified } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!is2FAVerified) {
    return <Navigate to="/verify-2fa" replace />
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
