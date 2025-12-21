// hooks/useProjectTodoVM.js
import { useSyncExternalStore } from "react";
import { projectViewModel } from "../viewmodels/projectViewModel";

export function useProjectViewModel() {
  return useSyncExternalStore(
    projectViewModel.subscribe,
    projectViewModel.getSnapshot
  );
}
