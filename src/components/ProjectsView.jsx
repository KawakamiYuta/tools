// components/ProjectList.jsx
import { useState } from "react";
import { projectViewModel } from "../viewmodels/projectViewModel";
import { useProjectViewModel } from "../hooks/useProjectViewModel";
import { styles } from "./ProjectsView.styles";

export function ProjectsView() {
  const { projects, selectedProjectId } = useProjectViewModel();
  const [newProject, setNewProject] = useState("");

  const handleAdd = async () => {
    const name = newProject.trim();
    if (!name) return;
    const ret = await projectViewModel.addProject(name);
    if(!ret.ok) alert(ret.reason); 
    setNewProject("");
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Projects</h3>

      <div style={styles.list}>
        {projects.map(p => {
          const selected = p.id === selectedProjectId;

          return (
            <div
              key={p.id}
              onClick={() => projectViewModel.selectProject(p.id)}
              style={{
                ...styles.row,
                ...(selected ? styles.rowSelected : {}),
              }}
            >
              <span style={styles.icon}>📁</span>
              <span style={styles.name}>{p.name}</span>

              {/* 操作ボタン */}
              <div style={styles.actions}>
                <button
                  style={styles.actionButton}
                  onClick={e => {
                    e.stopPropagation();
                    projectViewModel.removeProject(p.id);
                  }}
                  title="削除"
                >
                  🗑
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={styles.addRow}>
        <input
          value={newProject}
          onChange={e => setNewProject(e.target.value)}
          placeholder="新しいプロジェクト"
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.addButton}>
          ➕
        </button>
      </div>
    </div>
  );
}
