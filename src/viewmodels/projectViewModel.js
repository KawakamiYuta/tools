// viewmodels/projectTodoVM.js
import { invoke } from "@tauri-apps/api/core";

let state = {
  projects: [],
  selectedProjectId: null,
  todos: [],
  loading: false,
};

const listeners = new Set();
const notify = () => listeners.forEach(l => l());

async function loadProjects() {
  const projects = await invoke("get_projects");
  state = { ...state, projects };
  notify();
}

async function loadTodos(projectId) {
  state = { ...state, loading: true };
  notify();

  const todos = await invoke("get_todos_by_project", {
    projectId,
  });

  state = { ...state, todos, loading: false };
  notify();
}

// 初期ロード
loadProjects();

export const projectViewModel = {
  // React用
  getSnapshot() {
    return state;
  },

  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // 操作API
  async selectProject(projectId) {
    state = {
      ...state,
      selectedProjectId: projectId,
    };
    notify();

    await loadTodos(projectId);
  },

  async addProject(name) {
    await invoke("add_project", { name });
    await loadProjects();
  },

  async addTodo(projectId, task) {
    console.log("addTodo", projectId, task);
    await invoke("add_todo", { projectId, description: task });
    await loadTodos(projectId);
  }
};
