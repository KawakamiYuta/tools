// components/TodoList.jsx
import { useState } from "react";
import { projectViewModel } from "../viewmodels/projectViewModel";
import { useProjectViewModel } from "../hooks/useProjectViewModel";

export function TodoListView() {
  const {
    selectedProjectId,
    todos,
    loading,
  } = useProjectViewModel();

    const [newTodo, setNewTodo] = useState("");

  if (!selectedProjectId) {
    return <div>プロジェクトを選択してください</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
      const handleAdd = async () => {
        const name = newTodo.trim();
        if (!name) return;
        await projectViewModel.addTodo(selectedProjectId, name);
        setNewTodo("");
      };
  return (
    <>
    <div>
      <h3>TODO</h3>
      <ul>
        {todos.map(t => (
          <li key={t.id}>{t.description}</li>
        ))}
      </ul>
    </div>
          <input
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="TODO"
      />
      <button onClick={handleAdd}>追加</button>
      </>
  );
}
