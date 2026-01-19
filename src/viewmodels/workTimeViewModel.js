import { invoke } from "@tauri-apps/api/core";

let state = {
  running: false,
  totalMs: 0,
  startTime: null,
  project: null,
  description: "",
  sessions: [],
};

let timeout = null;

const listeners = new Set();
const notify = () => listeners.forEach(l => l());

async function loadSessions() {
  try {
    const sessions = await invoke("get_work_sessions");
    //console.log("Fetched sessions:", sessions);
    state = { ...state, sessions };
    notify();
  } catch (e) {
    console.error("Failed to fetch sessions", e);
  }
};

loadSessions();

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
    timeout = setInterval(() => {
      if (!state.running || state.startTime === null) return;

      state = {
        ...state,
        totalMs: Date.now() - state.startTime,
      };
      notify();
    }, 500);
  },

  async stop(project, description) {
    if (!state.running) return;

    if (timeout !== null) {
      clearInterval(timeout);
      timeout = null;
    }

    await invoke("add_work_session", {
      projectId: project,
      description,
      start: state.startTime,
      end: Date.now(),
    }
    )

    state = {
      ...state,
      running: false,
      startTime: null,
      totalMs: 0,
      description: "",
    };

    loadSessions();
  },

  async setDescription(description) {
    state = {
      ...state, description
    };
    notify();
  },

  async updateWorkSession(session) {
    console.log("Updating work session:", session);
    await invoke("update_work_session", { workSession: session });
    loadSessions();
  }
};
