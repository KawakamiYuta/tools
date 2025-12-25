//import { useWorkTimer } from "../hooks/useWorkTimer";

import { TimerToggleButton } from "./TimerToggleButton";
import { ElapsedTimeView } from "./ElapsedTimeView";

import { useWorkTimeViewModel } from "../../hooks/useWorkTimeViewModel";
import { workTimeViewModel } from "../../viewmodels/workTimeViewModel";
import { projectViewModel } from "../../viewmodels/projectViewModel";
import { ProjectSelectView } from "./ProjectSelectView";

export default function WorkTimeTrackView() {
  const { running, totalMs} = useWorkTimeViewModel();
  const [ selected, setSelected ] = useState(null);

  const start = async () => {
    await workTimeViewModel.start();
  };

  const stop = async () => {
    await workTimeViewModel.stop();
  };

  return (
    <div className="flex flex-col items-center gap-6">
        <input
        type="text"
        placeholder="作業内容を入力してください"
      />
      <ProjectSelectView selected={selected} setSelected={setSelected} />
      <ElapsedTimeView ms={totalMs} />

      <TimerToggleButton
        running={running}
        onToggle={running ? workTimeViewModel.stop : workTimeViewModel.start}
      />

      <div className="text-sm text-gray-500">
        {running ? "作業中" : "停止中"}
      </div>
    </div>
  );
}
