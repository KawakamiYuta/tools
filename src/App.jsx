import { useState, useEffect } from "react";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { invoke } from "@tauri-apps/api/core";
import WorkTimer from "./WorkTimer";
import WorkSummary from "./WorkSummary";
import TodoManager from "./TodoManager";
import { ProjectsView } from "./components/ProjectsView";
import { useProjectTodos } from "./hooks/useProjectTodos";
import { TodoListView } from "./components/TodoListView";
//import { WorkTimeTrackView } from "./components/WorkTimeTrackView";
//import { ProjectProvider } from "./contexts/ProjectContext";
import "./App.css";
import WorkTimeTrackView from "./components/work/WorkTimeTrackView";
//import { WorkTimeTrackView } from "./components/WorkTimeTrackView";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
const LazyThemeToggle = React.lazy(() => import("./components/ThemeToggle"));


function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("app-theme") || (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    } catch (e) {
      return "dark";
    }
  });

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#D4AF37",
      },
      background: {
        default: mode === "light" ? "#F7F5F2" : "#0F1720",
      },
    },
    typography: {
      fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif",
    },
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (mode === "light") root.classList.add("theme-light");
      else root.classList.remove("theme-light");
      localStorage.setItem("app-theme", mode);
    } catch (e) {
      // ignore
    }
  }, [mode]);


  // ...existing code...

  // プロジェクト管理
  const [projects, setProjects] = useState([]);

  const [selectedProject, setSelectedProject] = useState("");

  // ...existing code...

  // ToDo管理
  //const [todos, setTodos] = useState([]);
  //const [todoInput, setTodoInput] = useState("");

  // // プロジェクト追加
  // const handleAddProject = () => {
  //   const name = newProject.trim();
  //   if (!name || projects.includes(name)) return;
  //   setProjects([...projects, name]);
  //   setNewProject("");
  // };

  // // プロジェクト選択時にToDo取得
  // useEffect(() => {
  //   if (!selectedProject) return;
  //   (async () => {
  //     const todos = await invoke("get_todos", { project: selectedProject });
  //     setTodos(todos);
  //   })();
  // }, [selectedProject]);

  const { selectedProjectId, setSelectedProjectId } = useState(null);
  const { todos, loading, error } = useProjectTodos(selectedProjectId, setSelectedProjectId);
  return (
    <main className="container">
      <ThemeProvider theme={theme}>
        <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginBottom: 12 }}>
          {/* Lazy-load ThemeToggle to avoid circular imports */}
          {typeof window !== "undefined" && (
            <React.Suspense fallback={<div style={{ width: 40 }} />}> 
              <LazyThemeToggle mode={mode} setMode={setMode} />
            </React.Suspense>
          )}
        </div>

        <Tabs>
          <TabList>
            <Tab>project</Tab>
            <Tab>todo</Tab>
            <Tab>work</Tab>
            <Tab>summary</Tab>
          </TabList>
          <TabPanel>
            <ProjectsView />
          </TabPanel>
          <TabPanel>
            <TodoListView />
          </TabPanel>
          <TabPanel>
            <WorkTimeTrackView />
          </TabPanel>
          <TabPanel>
            {/* <WorkSummary projects={projects} /> */}

          </TabPanel>
        </Tabs>
      </ThemeProvider>

    </main>
  );
}

export default App;
