import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthService } from "../services/AuthService";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
  const [userRole, setUserRole] = useState<string | null>(AuthService.getUserRole()); 
  
  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAuthenticated(AuthService.isAuthenticated());
      setUserRole(AuthService.getUserRole()); // ✅ Fetch role from AuthService
    };

    window.addEventListener("storage", checkAuthStatus); // ✅ Syncs auth state across tabs

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const login = async (email: string, password: string) => {
    const success = await AuthService.login(email, password);
    if (success) {
      setIsAuthenticated(true);
      setUserRole(AuthService.getUserRole()); // ✅ Update role after login
    }
    return success;
  };

  const logout = () => {
    AuthService.logout();
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
