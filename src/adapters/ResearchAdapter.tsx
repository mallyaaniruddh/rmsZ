import axios from "axios";
import { AuthService } from "../services/AuthService"; // ✅ Use centralized token handling

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const ResearchAdapter = {
  getProjects: async () => {
    try {
      const token = AuthService.isAuthenticated() ? localStorage.getItem("token") : null;
      
      if (!token) {
        throw new Error("Unauthorized: No token available");
      }

      const response = await axios.get(`${API_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error : any) {
      console.error("Error fetching projects:", error.response?.data?.message || "Unknown error");
      return { error: error.response?.data?.message || "Failed to fetch projects" };
    }
  },

  addProject: async (project: { title: string; researcher: string }) => {
    try {
      const token = AuthService.isAuthenticated() ? localStorage.getItem("token") : null;

      if (!token) {
        throw new Error("Unauthorized: No token available");
      }

      const response = await axios.post(`${API_URL}/projects`, project, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error : any) {
      console.error("Error adding project:", error.response?.data?.message || "Unknown error");
      return { error: error.response?.data?.message || "Failed to add project" };
    }
  },
};
