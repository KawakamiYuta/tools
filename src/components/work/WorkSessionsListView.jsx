import React, { useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip, Button } from "@mui/material";
import { Calendar as CalendarIcon, Table as TableIcon } from "lucide-react";
import WorkSessionsCalendarView from "./WorkSessionsCalendarView";

function formatShortDate(ts) {
  if (!ts) return "-";
  return new Date(ts).toLocaleString([], { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function formatDurationMs(ms) {
  if (!ms || ms < 1000) return "0s";
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m ${sec}s`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}

export function WorkSessionsListView({ sessions = [] }) {
  const now = Date.now();

  const rows = useMemo(
    () =>
      sessions.map((s) => {
        const start = s.start ?? 0;
        const end = s.end ?? now;
        const ongoing = s.end == null;
        return {
          id: s.id,
          description: s.description || "(説明なし)",
          range: `${formatShortDate(start)} — ${ongoing ? "未終了" : formatShortDate(end)}`,
          durationMs: Math.max(0, end - start),
          duration: formatDurationMs(Math.max(0, end - start)),
          ongoing,
        };
      }),
    [sessions, now]
  );

  const columns = [
    {
      field: "project",
      headerName: "プロジェクト",
      width: 160,
      renderCell: (params) => <div>{params.row.projectName}</div>,
    },
    {
      field: "description",
      headerName: "説明",
      flex: 1,
      minWidth: 240,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
          <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{params.value}</div>
          {params.row.ongoing && <Chip label="進行中" size="small" color="warning" />}
        </div>
      ),
    },
    {
      field: "range",
      headerName: "期間",
      width: 240,
      renderCell: (params) => <div style={{ color: "#6b7280" }}>{params.value}</div>,
    },
    {
      field: "duration",
      headerName: "所要",
      width: 120,
      headerAlign: "right",
      align: "right",
      renderCell: (params) => <div style={{ fontWeight: 600 }}>{params.value}</div>,
      sortComparator: (v1, v2, param1, param2) => param1.row.durationMs - param2.row.durationMs,
    },
  ];

  const [view, setView] = useState("table");

  if (!sessions || sessions.length === 0) {
    return <div className="text-sm text-gray-500">作業記録はありません</div>;
  }

  return (
    <div style={{ width: "100%" }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">作業記録</h3>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">{sessions.length} 件</div>

          <div className="flex items-center rounded-md bg-gray-100 p-1">
            <Button
              variant={view === "table" ? "contained" : "text"}
              size="small"
              startIcon={<TableIcon className="w-4 h-4" />}
              onClick={() => setView("table")}
            >
              テーブル
            </Button>
            <Button
              variant={view === "calendar" ? "contained" : "text"}
              size="small"
              startIcon={<CalendarIcon className="w-4 h-4" />}
              onClick={() => setView("calendar")}
            >
              カレンダー
            </Button>
          </div>
        </div>
      </div>

      {view === "table" ? (
        <div style={{ width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
            disableRowSelectionOnClick
            density="compact"
            getRowId={(row) => row.id}
          />
        </div>
      ) : (
        <WorkSessionsCalendarView sessions={sessions} />
      )}
    </div>
  );
}
