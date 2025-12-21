// contexts/ProjectProvider.jsx
import { ProjectContext } from "./ProjectContext";
import { useProjects } from "../hooks/useProjects";

export function ProjectProvider({ children }) {
  const projectState = useProjects();

  return (
    <ProjectContext.Provider value={projectState}>
      {children}
    </ProjectContext.Provider>
  );
}
