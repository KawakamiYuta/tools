import { useState, useSyncExternalStore, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

export function useProjectTodos(projectId) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectId) {
      setTodos([]);
      return;
    }

    let cancelled = false;

    async function fetchTodos() {
      setLoading(true);
      setError(null);
      try {
        const result = await invoke(
          "get_todos_by_project",
          { projectId }
        );
        if (!cancelled) {
          setTodos(result);
        }
      } catch (e) {
        if (!cancelled) {
          setError(String(e));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchTodos();

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return { todos, loading, error };
}
