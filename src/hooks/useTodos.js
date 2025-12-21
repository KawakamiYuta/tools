import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

export function useTodos(project) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    const result = await invoke("get_todos", { project });
    setTodos(result);
    setLoading(false);
  }

  useEffect(() => {
    refresh();

    const unlistenPromise = listen("todos:changed", (event) => {
      // project を payload で絞りたい場合
      // if (event.payload !== project) return;
      refresh();
    });

    return () => {
      unlistenPromise.then((unlisten) => unlisten());
    };
  }, [project]);

  return { todos, loading, refresh };
}
