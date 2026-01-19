import { projectViewModel } from "../../viewmodels/projectViewModel";
import { useProjectViewModel } from "../../hooks/useProjectViewModel";

export function ProjectSelectView(props) {
  const { selected, setSelected,className } = props;

  const { projects } = useProjectViewModel();

  console.log("ProjectSelectView render", selected);
  return (
    <select
      value={selected ?? ""}
      onChange={(e) =>
        setSelected(e.target.value === "" ? null : e.target.value)
      }
      className={className}
    >
      <option value=""></option>

      {projects.map((project) => (
        <option key={project.id} value={project.id}>
          {project.name}
        </option>
      ))}
    </select>
  );
};
