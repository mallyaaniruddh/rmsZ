import React, { useEffect, useState } from "react";
import { ResearchService } from "../services/ResearchService";
import { useAuth } from "../context/AuthContext"; // Get role from AuthContext

const ResearchDashboard: React.FC = () => {
  const { userRole } = useAuth(); // Get role dynamically
  const [projects, setProjects] = useState<{ id: number; title: string; researcher: string }[]>([]);
  const [title, setTitle] = useState("");
  const [researcher, setResearcher] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await ResearchService.getAllProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const newProject = await ResearchService.addProject(title, researcher);
    if (newProject) {
      setProjects([...projects, newProject]);
      setTitle("");
      setResearcher("");
    } else {
      setError("Failed to add project. Try again.");
    }
  };

  return (
    <div>
      <h2>Research Projects</h2>

      {error && <p className="error-message">{error}</p>}

      {/* Only show form if user is "admin" or "researcher" */}
      {(userRole === "admin" || userRole === "researcher") && (
      <form onSubmit={handleAddProject}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Researcher Name"
          value={researcher}
          onChange={(e) => setResearcher(e.target.value)}
          required
        />
        <button type="submit">Add Project</button>
      </form>
      )}

      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <strong>{project.title}</strong> - {project.researcher}
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No projects available.</p>
      )}
    </div>
  );
};

export default ResearchDashboard;
