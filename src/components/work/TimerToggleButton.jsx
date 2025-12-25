import { Play, Square } from "lucide-react";

export function TimerToggleButton({ running, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`
        w-24 h-24 rounded-full flex items-center justify-center
        transition-all duration-200
        ${
          running
            ? "bg-red-500 hover:bg-red-600 shadow-red-400/50"
            : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-400/50"
        }
        shadow-lg hover:scale-105 active:scale-95
      `}
    >
      {running ? (
        <Square size={32} className="text-white" />
      ) : (
        <Play size={32} className="text-white ml-1" />
      )}
    </button>
  );
}
