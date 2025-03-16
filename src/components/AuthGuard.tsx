import { Navigate } from "react-router-dom";
import React from "react";
import { jwtDecode } from "jwt-decode";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const { exp }: { exp: number } = jwtDecode(token);

    if (exp * 1000 <= Date.now()) {
      localStorage.removeItem("token"); // Remove expired token
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

export default AuthGuard;
