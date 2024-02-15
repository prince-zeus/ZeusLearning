import { createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [is2FAVerified, setIs2FAVerified] = useLocalStorage("is2faverified", false);
  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    
    // Navigate to 2FA verification page
    navigate("/verify-2fa", {state: {from: from}});
  };

  const logout = () => {
    setUser(null);
    setIs2FAVerified(false);
    navigate("/", { replace: true });
  };

  const verify2FACode = async (code) => {
    // Mock verification logic
    // In a real scenario, this is where you’d implement actual 2FA verification, like sending a code via SMS or email.
    if (code === "0000") {
      setIs2FAVerified(true);
      navigate(from, {replace: true}); // Navigate to a protected route after successful 2FA
      return true;
    }
    return false;
  };

  const value = {
    user,
    is2FAVerified,
    isAdmin: false,
    login,
    logout,
    verify2FACode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};