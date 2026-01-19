//import { useWorkTimer } from "../hooks/useWorkTimer";

import { useState } from "react";

import { Button } from "@mui/material";
import { Calendar as CalendarIcon, Table as TableIcon } from "lucide-react";

import { useWorkTimeViewModel } from "../../hooks/useWorkTimeViewModel";
import { WorkSessionsListView } from "./WorkSessionsListView";
import { WorkSessionsCalendarView } from "./WorkSessionsCalendarView";

export default function WorkTimeTrackView() {
  const { sessions } = useWorkTimeViewModel();
  const [view, setView] = useState("table");

  //console.log("WorkTimeTrackView", running, totalMs, project, description, sessions);
  //const [ selected, setSelected ] = useState(null);

  return (
    <div className="flex flex-col items-center gap-6">
          <div className="flex items-center rounded-md bg-gray-100 p-1">
            <Button 
            variant={view === "table" ? "contained" : "text"}
            size="small"
            startIcon={<TableIcon className="w-4 h-4" />}
            onClick={() => setView("table")} > テーブル </Button>
            <Button variant={view === "calendar" ? "contained" : "text"}
            size="small"
            startIcon={<CalendarIcon className="w-4 h-4" />}
            onClick={() => setView("calendar")} > カレンダー </Button>
          </div>
      {view === "table" ? (
      <WorkSessionsListView sessions={sessions} /> ) : 
      (<WorkSessionsCalendarView sessions={sessions} />)}
    </div>
  );
}
