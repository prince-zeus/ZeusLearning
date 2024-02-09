import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Verify2FA = () => {
  const navigate = useNavigate();
  const { user, verify2FACode, is2FAVerified } = useAuth();
  const [code, setCode] = useState("");

  if(!user) {
    return <Navigate to="/login" />
  }

  if(is2FAVerified) {
    return <Navigate to="/" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await verify2FACode(code);
    if (isValid) {
      navigate("/");
    } else {
      alert("Invalid code. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type= "text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder= "Enter verification code"
      />
      <button type="submit">Verify</button>
    </form>
  );
};