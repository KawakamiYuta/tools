import { projectViewModel } from "../../viewmodels/projectViewModel";
import { useProjectViewModel } from "../../hooks/useProjectViewModel";

import { useState } from "react";

export function ProjectSelectView(props) {
  const { projects } = useProjectViewModel();
  const {selected, setSelected} = props;

  const onChange = (projectId) => {
    setSelected(projectId);
  }

  return (
    <select
      value={selected ?? ""}
      onChange={(e) =>
        onChange(e.target.value === "" ? null : e.target.value)
      }
      style={{
        padding: "6px 8px",
        borderRadius: 4,
        border: "1px solid #ccc",
        minWidth: 200,
      }}
    >
      <option value="">-- プロジェクトを選択 --</option>

      {projects.map((project) => (
        <option key={project.id} value={project.id}>
          {project.name}
        </option>
      ))}
    </select>
  );
};
