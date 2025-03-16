import { ResearchAdapter } from "../adapters/ResearchAdapter";

export const ResearchService = {
  getAllProjects: async () => {
    try {
      return await ResearchAdapter.getProjects();
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  },

  addProject: async (title: string, researcher: string) => {
    try {
      return await ResearchAdapter.addProject({title, researcher});
    } catch (error) {
      console.error("Error adding project:", error);
      return null;
    }
  },
};
