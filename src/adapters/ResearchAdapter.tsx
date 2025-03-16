import axios from "axios";
import { AuthService } from "../services/AuthService"; // Use centralized token handling

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === "true"; // Read mock mode from .env

// Centralized function to get the token
const getAuthToken = (): string | null => {
  if (useMockData) return "mock-token"; // Fake token in mock mode
  return AuthService.isAuthenticated() ? localStorage.getItem("token") : null;
};

export const ResearchAdapter = {
  getProjects: async () => {
    if (useMockData) {
      console.log("Using mock data for projects");
      return [
        { id: 1, title: "AI in Healthcare", researcher: "Dr. Smith" },
        { id: 2, title: "Quantum Computing", researcher: "Alice Brown" },
      ]; // Fake projects
    }

    try {
      const token = getAuthToken();
      if (!token) throw new Error("Unauthorized: No token available");

      const response = await axios.get(`${API_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error: any) {
      console.error("Error fetching projects:", error.response?.data?.message || "Unknown error");
      return { error: error.response?.data?.message || "Failed to fetch projects" };
    }
  },

  addProject: async (project: { title: string; researcher: string }) => {
    if (useMockData) {
      console.log("Using mock mode - Adding project locally");
      return { id: Math.random(), ...project }; // Fake project ID
    }

    try {
      const token = getAuthToken();
      if (!token) throw new Error("Unauthorized: No token available");

      const response = await axios.post(`${API_URL}/projects`, project, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error: any) {
      console.error("Error adding project:", error.response?.data?.message || "Unknown error");
      return { error: error.response?.data?.message || "Failed to add project" };
    }
  },
};
