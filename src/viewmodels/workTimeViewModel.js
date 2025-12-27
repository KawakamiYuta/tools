import { invoke } from "@tauri-apps/api/core";
import { DessertIcon } from "lucide-react";

let state = {
  running: false,
  totalMs: 0,
  startTime: null,
  project: null,
  description: "",
};

let timerId = null;

const listeners = new Set();
const notify = () => listeners.forEach(l => l());

export const workTimeViewModel = {
  // React 用
  getSnapshot() {
    return state;
  },

  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  async start() {
    if (state.running) return;

    const startTime = Date.now();

    state = {
      ...state,
      running: true,
      startTime,
    };
    notify();

    // 定周期更新（500ms）
    timerId = setInterval(() => {
      if (!state.running || state.startTime === null) return;

      state = {
        ...state,
        totalMs: Date.now() - state.startTime,
      };
      notify();
    }, 500);
  },

  async stop() {
    if (!state.running) return;

    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }

    state = {
      ...state,
      running: false,
      startTime: null,
      description: "",
    };
    notify();
  },

  setProject(project) {
    state = { ...state, project };
    notify();
  },

  setDescription(description) {
    state = { ...state, description };
    notify();
  },
};
