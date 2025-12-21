import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function WorkSummary({ projects }) {
  const [summary, setSummary] = useState([]);
  const [dailySummary, setDailySummary] = useState([]);

  useEffect(() => {
    if (!projects || projects.length === 0) {
      setSummary([]);
      setDailySummary([]);
      return;
    }
    (async () => {
      const results = await Promise.all(
        projects.map(async (project) => {
          const records = await invoke("get_work_records", { project });
          const totalSeconds = records.reduce((sum, r) => sum + ((r.end - r.start) / 1000), 0);
          const dailyResult = await invoke("get_daily_work_summary", { project });
          return { project, totalSeconds, daily: dailyResult.daily };
        })
      );
      setSummary(results.map(({ project, totalSeconds }) => ({ project, totalSeconds })));
      setDailySummary(results.map(({ project, daily }) => ({ project, daily })));
    })();
  }, [projects]);

return (
  <div
    style={{
      marginBottom: "2rem",
      padding: "1rem",
      border: "1px solid #64b5f6",
      borderRadius: "8px",
      background: "#1e1e1e",
      color: "#e0e0e0",
    }}
  >
    <h3 style={{ color: "#ffffff" }}>全プロジェクト作業時間集計</h3>

    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "2rem",
        color: "#e0e0e0",
      }}
    >
      <thead>
        <tr style={{ background: "#263238" }}>
          <th style={{ textAlign: "left", padding: "0.5rem" }}>プロジェクト</th>
          <th style={{ textAlign: "right", padding: "0.5rem" }}>合計（秒）</th>
          <th style={{ textAlign: "right", padding: "0.5rem" }}>合計（分）</th>
        </tr>
      </thead>
      <tbody>
        {summary.length === 0 && (
          <tr>
            <td colSpan={3} style={{ textAlign: "center", padding: "1rem", color: "#aaaaaa" }}>
              プロジェクトなし
            </td>
          </tr>
        )}

        {summary.map(({ project, totalSeconds }) => (
          <tr key={project} style={{ background: "#1b1b1b" }}>
            <td style={{ padding: "0.5rem" }}>{project}</td>
            <td style={{ textAlign: "right", padding: "0.5rem" }}>
              {totalSeconds.toFixed(0)}
            </td>
            <td style={{ textAlign: "right", padding: "0.5rem" }}>
              {(totalSeconds / 60).toFixed(1)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* 日別集計テーブル */}
    <h4 style={{ color: "#ffffff" }}>作業日ごとの集計</h4>
    {dailySummary.length === 0 && <div style={{ color: "#aaaaaa" }}>プロジェクトなし</div>}

    {dailySummary.map(({ project, daily }) => (
      <div key={project} style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "#ffffff" }}>
          {project}
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "0.5rem",
            color: "#e0e0e0",
          }}
        >
          <thead>
            <tr style={{ background: "#263238" }}>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>日付</th>
              <th style={{ textAlign: "right", padding: "0.5rem" }}>合計（秒）</th>
              <th style={{ textAlign: "right", padding: "0.5rem" }}>合計（分）</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(daily).length === 0 && (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: "1rem", color: "#aaaaaa" }}>
                  記録なし
                </td>
              </tr>
            )}

            {Object.entries(daily).map(([date, sec]) => (
              <tr key={date} style={{ background: "#1b1b1b" }}>
                <td style={{ padding: "0.5rem" }}>{date}</td>
                <td style={{ textAlign: "right", padding: "0.5rem" }}>{sec.toFixed(0)}</td>
                <td style={{ textAlign: "right", padding: "0.5rem" }}>
                  {(sec / 60).toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);

}
