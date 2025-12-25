import { useEffect, useState } from "react";

export function useWorkTimer() {
  const [running, setRunning] = useState(false);
  const [startedAt, setStartedAt] = useState(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [now, setNow] = useState(Date.now()); // ← これが重要

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(id);
  }, [running]);

  const start = () => {
    setStartedAt(Date.now());
    setRunning(true);
  };

  const stop = () => {
    if (startedAt) {
      setElapsedMs(prev => prev + (Date.now() - startedAt));
    }
    setStartedAt(null);
    setRunning(false);
  };

  const totalMs =
    running && startedAt
      ? elapsedMs + (now - startedAt)
      : elapsedMs;

  return {
    running,
    totalMs,
    start,
    stop,
  };
}
