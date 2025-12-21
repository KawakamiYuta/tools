import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function TodoManager({ project }) {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    if (!project) return;
    (async () => {
      const todos = await invoke("get_todos", { project });
      setTodos(todos);
    })();
  }, [project]);

  const handleAddTodo = async () => {
    if (!project || !todoInput.trim()) return;
    await invoke("add_todo", { project, title: todoInput.trim() });
    const todos = await invoke("get_todos", { project });
    setTodos(todos);
    setTodoInput("");
  };

  return (
    <div
      style={{
        marginBottom: "2rem",
        padding: "1rem",
        border: "1px solid #555",
        borderRadius: "8px",
        background: "#1e1e1e",
        color: "#e0e0e0",
      }}
    >
      <h3 style={{ color: "#ffffff" }}>ToDo管理</h3>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <input
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          placeholder="新しいToDoを入力"
          style={{
            fontSize: "1rem",
            padding: "0.5rem",
            width: "220px",
            background: "#2a2a2a",
            color: "#fff",
            border: "1px solid #666",
            borderRadius: "6px",
          }}
        />

        <button
          onClick={handleAddTodo}
          style={{
            padding: "0.5rem 1rem",
            background: "#333",
            color: "#fff",
            border: "1px solid #666",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.target.style.background = "#444")}
          onMouseOut={(e) => (e.target.style.background = "#333")}
        >
          追加
        </button>
      </div>

      <ul style={{ paddingLeft: "1rem", color: "#e0e0e0" }}>
        {todos.length === 0 && <li style={{ color: "#999" }}>ToDoはありません</li>}

        {todos.map((todo, idx) => (
          <li
            key={idx}
            style={{
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <input type="checkbox" checked={todo.done} readOnly />
            <span
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                color: todo.done ? "#888" : "#fff",
              }}
            >
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

}
