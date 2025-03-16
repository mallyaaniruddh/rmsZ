import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthService } from "../services/AuthService";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Read mock mode from environment variable
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === "true";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    useMockData ? true : AuthService.isAuthenticated()
  );
  const [userRole, setUserRole] = useState<string | null>(
    useMockData ? "researcher" : AuthService.getUserRole()
  );

  useEffect(() => {
    const checkAuthStatus = () => {
      if (!useMockData) {
        setIsAuthenticated(AuthService.isAuthenticated());
        setUserRole(AuthService.getUserRole());
      }
    };

    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const login = async (email: string, password: string) => {
    if (useMockData) {
      setIsAuthenticated(true);
      setUserRole("researcher");
      return true;
    }

    try {
      const success = await AuthService.login(email, password);
      if (success) {
        setIsAuthenticated(true);
        setUserRole(AuthService.getUserRole());
      } else {
        console.error("❌ Login failed: Invalid credentials");
      }
      return success;
    } catch (error) {
      console.error("❌ Login error:", error);
      return false;
    }
  };

  const logout = () => {
    if (!useMockData) AuthService.logout();
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
