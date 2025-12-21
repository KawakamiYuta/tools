import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function WorkTimer({ project }) {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [workRecords, setWorkRecords] = useState([]);

  // 合計作業時間（秒）
  const totalSeconds = workRecords.reduce((sum, r) => sum + ((r.end - r.start) / 1000), 0);

  useEffect(() => {
    if (!project) return;
    (async () => {
      const records = await invoke("get_work_records", { project });
      setWorkRecords(records);
    })();
  }, [project, startTime, endTime]);

  const handleStart = () => {
    setStartTime(Date.now());
    setEndTime(null);
  };

  const handleEnd = async () => {
    if (!project || !startTime) return;
    const end = Date.now();
    setEndTime(end);
    await invoke("add_work_record", {
      project,
      start: startTime,
      end: end,
    });
    setStartTime(null);
  };

  return (
    <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>作業時間計測</h3>
      <div style={{ marginBottom: '1rem', fontWeight: 'bold', color: '#1976d2' }}>
        合計作業時間: {totalSeconds.toFixed(0)} 秒（{(totalSeconds / 60).toFixed(1)} 分）
      </div>
      <button onClick={handleStart} disabled={!!startTime && !endTime}>
        開始
      </button>
      <button onClick={handleEnd} disabled={!startTime || !!endTime} style={{ marginLeft: '1rem' }}>
        終了
      </button>
      <div style={{ marginTop: '1rem' }}>
        <strong>履歴:</strong>
        <ul>
          {workRecords.length === 0 && <li>記録なし</li>}
          {workRecords.map((r, idx) => (
            <li key={idx}>
              {new Date(r.start).toLocaleString()} ～ {new Date(r.end).toLocaleString()}（{((r.end - r.start) / 1000).toFixed(0)}秒）
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
