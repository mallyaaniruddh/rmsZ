import axios from "axios";

const API_URL = "http://localhost:5001/api";

export const AuthAdapter = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      console.log("Backend Response:", response.data); // Debugging
      return response.data;
    } catch (error: any) {
      console.error("Login failed:", error.response?.data?.message || "Unknown error");
      return { error: error.response?.data?.message || "Login failed" };
    }
  },
};
