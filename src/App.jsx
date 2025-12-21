import { useState, useEffect } from "react";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { invoke } from "@tauri-apps/api/core";
import WorkTimer from "./WorkTimer";
import WorkSummary from "./WorkSummary";
import TodoManager from "./TodoManager";
import { ProjectsView } from "./components/ProjectsView";
import "./App.css";

function App() {
  return (
    <main className="container">
      <Tabs>
        <TabList>
          <Tab>work</Tab>
          <Tab>summary</Tab>
        </TabList>

        <TabPanel>
          {/* <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              value={newProject}
              onChange={e => setNewProject(e.target.value)}
              placeholder="新しいプロジェクト名"
              style={{ fontSize: '1rem', padding: '0.5rem', width: '200px' }}
            />
            <button onClick={handleAddProject}>追加</button>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <select
              value={selectedProject}
              onChange={e => setSelectedProject(e.target.value)}
              style={{ fontSize: '1rem', padding: '0.5rem', width: '220px' }}
            >
              <option value="">プロジェクトを選択</option>
              {projects.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div> */}
          <ProjectsView />

          {/* 作業時間計測UI（分離コンポーネント） */}
          {/* {selectedProject && <WorkTimer project={selectedProject} />} */}

          {/* ToDo管理UI（分離コンポーネント） */}
          {/* {selectedProject && <TodoManager project={selectedProject} />} */}
        </TabPanel>
        <TabPanel>
          {/* <WorkSummary projects={projects} /> */}

        </TabPanel>
      </Tabs>


    </main>
  );
}

export default App;
