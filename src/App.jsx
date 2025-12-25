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
import WorkTimeTrackView from "./components/worktime/WorkTimeTrackView";
//import { WorkTimeTrackView } from "./components/WorkTimeTrackView";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

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


    </main>
  );
}

export default App;
