import { useState } from "react";
import { projectViewModel } from "../viewmodels/projectViewModel";
import { useProjectViewModel } from "../hooks/useProjectViewModel";
import "./TodoListView.css";

export function TodoListView() {
  const { selectedProjectId, todos, loading } = useProjectViewModel();
  const [newTodo, setNewTodo] = useState("");

  if (!selectedProjectId) {
    return <div className="todo-empty">プロジェクトを選択してください</div>;
  }

  if (loading) {
    return <div className="todo-loading">Loading...</div>;
  }

  const handleAdd = async () => {
    const name = newTodo.trim();
    if (!name) return;
    await projectViewModel.addTodo(selectedProjectId, name);
    setNewTodo("");
  };

  return (
    <div className="todo-card">
      <header className="todo-header">
        <h3>TODO</h3>
        <span className="todo-count">{todos.length}</span>
      </header>

      <ul className="todo-list">
        {todos.map(t => (
          <li key={t.id} className="todo-item">
            <input type="checkbox" />
            <span>{t.description}</span>
          </li>
        ))}
      </ul>

      <div className="todo-input">
        <input
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="新しいTODOを追加"
          onKeyDown={e => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd}>追加</button>
      </div>
    </div>
  );
}
