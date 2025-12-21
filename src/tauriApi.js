import { invoke } from "@tauri-apps/api/core";

export async function greet(name) {
  return await invoke("greet", { name });
}

export async function sample() {
  return await invoke("sample");
}
