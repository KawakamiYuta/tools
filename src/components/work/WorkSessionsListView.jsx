import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

import { workTimeViewModel } from "../../viewmodels/workTimeViewModel";
import { useProjectViewModel } from "../../hooks/useProjectViewModel";

import './WorkSessionsListView.css';
/* ---------- utils ---------- */

function formatShortDate(ts) {
  if (!ts) return "-";
  return new Date(ts).toLocaleString([], {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDurationMs(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}:${m}:${sec}`;
}

/* ---------- component ---------- */

export function WorkSessionsListView({ sessions = [] }) {
  const { projects } = useProjectViewModel();
  const columns = useMemo(() => [
    {
      accessorKey: "project_name", header: "プロジェクト",
      cell: ({ getValue, row: { index }, column: { id }, table }) => (
        <select
          onBlur={(e) => {
            //console.log("onBlur", { index, id, value: e.target.value });
            table.options.meta?.updateData(index, "project_id", e.target.value)
          }}
          style={{
            width: "90%",
            display: "block",
            margin: "0 auto",
          }}>
          <option value="">{getValue()}</option>

          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>)
    },
    //      ({ getValue }) => getValue()},
    { accessorKey: "description", header: "説明" },
    { accessorKey: "start", header: "開始時刻", cell: ({ getValue }) => formatShortDate(getValue()) },
    { accessorKey: "end", header: "終了時刻", cell: ({ getValue }) => formatShortDate(getValue()) },
    { accessorKey: "duration_seconds", header: "所要時間", cell: ({ getValue }) => formatDurationMs(getValue()) },
  ], []);

  const defaultColumn = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue();
      const [value, setValue] = useState(initialValue);

      React.useEffect(() => setValue(initialValue), [initialValue]);

      return (
        <input
          value={value ?? ""}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => table.options.meta?.updateData(index, id, value)}
          style={{
            width: "80%",
            display: "block",
            margin: "0 auto",
          }}
        />
      );
    },
  };

  const table = useReactTable({
    data: sessions,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        console.log("updateData", { rowIndex, columnId, value });
        let newRow = { ...sessions[rowIndex], [columnId]: value };
        workTimeViewModel.updateWorkSession(newRow);
      },
    },
    // getRowId: originalRow => originalRow.id,
  });

  if (!sessions.length) {
    return <div>作業記録はありません</div>;
  }

  return (
    <div>
      <table border="1" cellPadding="6" cellSpacing="0"
        className="table">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc" && " ▲"}
                  {header.column.getIsSorted() === "desc" && " ▼"}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell ??
                    cell.column.columnDef.accessorKey,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
