import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://5432/api";
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === "true" || true;

export const AuthAdapter = {
  login: async (email: string, password: string) => {
    if (useMockData) {
      console.log("Using mock mode for login");
      return { token: "mock-token", role: "researcher" }; // Fake login response
    }

    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      console.log("Backend Response:", response.data); // Debugging
      return response.data;
    } catch (error: any) {
      console.error(useMockData, "Login failed:", error.response?.data?.message || "Unknown error");
      return { error: error.response?.data?.message || "Login failed" };
    }
  },
};
