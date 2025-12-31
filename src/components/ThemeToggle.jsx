import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ mode, setMode }) {
  useEffect(() => {
    // apply class on mount/update
    const root = document.documentElement;
    if (mode === "light") root.classList.add("theme-light");
    else root.classList.remove("theme-light");
  }, [mode]);

  const toggle = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    try {
      localStorage.setItem("app-theme", next);
    } catch (e) {
      // ignore
    }
  };

  return (
    <Tooltip title={mode === "light" ? "ライトテーマ" : "ダークテーマ"}>
      <IconButton size="small" onClick={toggle} color="inherit" aria-label="toggle theme">
        {mode === "light" ? <Sun size={16} /> : <Moon size={16} />}
      </IconButton>
    </Tooltip>
  );
}
