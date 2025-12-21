// components/ProjectList.jsx
import { useState } from "react";
import { projectViewModel } from "../viewmodels/projectViewModel";
import { useProjectViewModel } from "../hooks/useProjectViewModel";

export function ProjectsView() {
  const { projects, selectedProjectId } =
    useProjectViewModel();
  const [newProject, setNewProject] = useState("");

  const handleAdd = async () => {
    const name = newProject.trim();
    if (!name) return;
    await projectViewModel.addProject(name);
    setNewProject("");
  };

  return (
    <div>
      <h3>Projects</h3>

      <ul>
        {projects.map(p => (
          <li
            key={p.id}
            onClick={() =>
              projectViewModel.selectProject(p.id)
            }
            style={{
              cursor: "pointer",
              fontWeight:
                p.id === selectedProjectId
                  ? "bold"
                  : "normal",
            }}
          >
            {p.name}
          </li>
        ))}
      </ul>

      <input
        value={newProject}
        onChange={e => setNewProject(e.target.value)}
        placeholder="新しいプロジェクト"
      />
      <button onClick={handleAdd}>追加</button>
    </div>
  );
}
