
import { useSyncExternalStore } from "react";
import { workTimeViewModel } from "../viewmodels/workTimeViewModel";

export function useWorkTimeViewModel() {
  return useSyncExternalStore(
    workTimeViewModel.subscribe,
    workTimeViewModel.getSnapshot
  );
}
