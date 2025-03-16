import { AuthAdapter } from "../adapters/AuthAdapter";

export const AuthService = {
  login: async (email: string, password: string) => {
    try {
        const data = await AuthAdapter.login(email, password);
        
        if (data.token && data.role) { // Ensure both token and role exist
          localStorage.setItem("token", data.token);
          localStorage.setItem("userRole", data.role);
          console.log("Stored token, role:", data.token, ", ", data.role);
          return true;
        }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/login"; // Redirect user
  },

  isAuthenticated: () => !!localStorage.getItem("token"),

  getUserRole: () => localStorage.getItem("userRole") || null, // Fetch user role
};
