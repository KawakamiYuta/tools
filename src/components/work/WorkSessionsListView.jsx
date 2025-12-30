import React from "react";

export function WorkSessionsListView({ sessions = [] }) {
  const formatDate = (ts) => new Date(ts).toLocaleString();
  const formatDuration = (start, end) => {
    const ms = end - start;
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
  };

  if (!sessions || sessions.length === 0) {
    return <div className="text-sm text-gray-500">作業記録はありません</div>;
  }

  return (
    <div className="w-full max-w-xl">
      <h3 className="font-semibold mb-2">作業記録</h3>
      <ul className="space-y-2">
        {sessions.map((s) => (
          <li key={s.id} className="p-2 border rounded">
            <div className="text-sm font-medium">{s.description || "(説明なし)"}</div>
            <div className="text-xs text-gray-500">
              {formatDate(s.start)} - {formatDate(s.end)} ({formatDuration(s.start, s.end)})
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
