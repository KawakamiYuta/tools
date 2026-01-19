import { useState } from "react";

import { workTimeViewModel } from "../../viewmodels/workTimeViewModel";

import { ProjectSelectView } from "./ProjectSelectView";
import { TimerToggleButton } from "./TimerToggleButton";
import { ElapsedTimeView } from "./ElapsedTimeView";
import { useWorkTimeViewModel } from "../../hooks/useWorkTimeViewModel";

import "./WorkTimeTrackControl.css";

export default function WorkTimeTrackControl() {
  const { running, totalMs, project, description } = useWorkTimeViewModel();
  const [ selectedProject, setSelectedProject ] = useState(null);


  const start = async () => {
    await workTimeViewModel.start();
  };

  const stop = async () => {
    workTimeViewModel.setDescription(description);
    await workTimeViewModel.stop(selectedProject, description);
    //setSelectedProject(null);
  };

  return (
    <div className="work-time-track-card">
    <div className="work-time-track-control">
      {/* 入力系（縦並び） */}
      <div className="work-time-track-control__inputs">
        <input
          type="text"
          value={description}
          onChange={(e) =>
            workTimeViewModel.setDescription(e.target.value)
          }
          placeholder="作業内容を入力してください"
          className="work-time-track-control__description-input"
        />
        <ProjectSelectView
          selected={selectedProject}
          setSelected={setSelectedProject}
          className="work-time-track-control__project-select"
        />
      </div>

      {/* 操作 */}
      <TimerToggleButton
        running={running}
        onToggle={running ? stop : start}
      />

      {/* 状態 */}
      <div className="work-time-track-control__status">
        {running ? <ElapsedTimeView ms={totalMs} /> : "停止中"}
      </div>
    </div>
    </div>
  );
}
