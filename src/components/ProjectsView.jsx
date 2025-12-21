//import { useProjects } from "../hooks/useProjects";
import { useEffect, useState, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
export function ProjectsView() {
  // const {
  //   projects,
  //   selectedProjectId,
  //   selectProject,
  //   addProject,
  // } = useProjects();

  const [newProject, setNewProject] = useState("");
  const [projects, setProjects] = useState([]);


  useEffect(() => {
  (async () => {
      const result = await invoke("get_projects");
      setProjects(result);
  })();
}, []);

    // プロジェクト追加
  const handleAddProject = async () => {
    const name = newProject.trim();
    if (!name || projects.includes(name)) return;
    const result = await invoke("add_project", { name });
    setNewProject("");
    const lst = await invoke("get_projects");
    setProjects(lst);
  };

  console.log("projects:", projects);
  return (
    <div>
      <h3>Projects</h3>

      <ul>
        {projects.map((p) => (
          <li
            key={p.id}
            style={{
              fontWeight: "normal",
              cursor: "pointer",
            }}
          >
            {p.name}
          </li>
        ))}
      </ul>

<div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              value={newProject}
              onChange={e => setNewProject(e.target.value)}
              placeholder="新しいプロジェクト名"
              style={{ fontSize: '1rem', padding: '0.5rem', width: '200px' }}
            />
            <button onClick={handleAddProject}>追加</button>
          </div>
    </div>
  );
}
