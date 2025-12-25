import { invoke } from "@tauri-apps/api/core";

let state = { 
    running: false, 
    totalMs: 0 
};

const listeners = new Set();
const notify = () => listeners.forEach(l => l());
export const workTimeViewModel = {
  // React用
  getSnapshot() {
    return state;
  },

  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  async start() {
    },
  
    async stop() {
    }
}