//import { useWorkTimer } from "../hooks/useWorkTimer";

import { useState } from "react";

import { TimerToggleButton } from "./TimerToggleButton";
import { ElapsedTimeView } from "./ElapsedTimeView";

import { useWorkTimeViewModel } from "../../hooks/useWorkTimeViewModel";
import { workTimeViewModel } from "../../viewmodels/workTimeViewModel";
import { projectViewModel } from "../../viewmodels/projectViewModel";
import { ProjectSelectView } from "./ProjectSelectView";

export default function WorkTimeTrackView() {
  const { running, totalMs, project, description } = useWorkTimeViewModel();
  console.log("WorkTimeTrackView", running, totalMs, project, description);
  //const [ selected, setSelected ] = useState(null);

  const start = async () => {
    console.log("start called with description:", description);
    await workTimeViewModel.start();
  };

  const stop = async () => {
    console.log("stop called with description:", description);
    workTimeViewModel.setDescription(description);
    await workTimeViewModel.stop();
  };

  return (
    <div className="flex flex-col items-center gap-6">
        <input
        type="text"
        value={description}
        onChange={(e) => workTimeViewModel.setDescription(e.target.value)}
        placeholder="作業内容を入力してください"
      />
      <ProjectSelectView selected={project} setSelected={workTimeViewModel.setProject} />
      <ElapsedTimeView ms={totalMs} />

      <TimerToggleButton
        running={running}
        onToggle={running ? stop : start}
      />

      <div className="text-sm text-gray-500">
        {running ? "作業中" : "停止中"}
      </div>
    </div>
  );
}
