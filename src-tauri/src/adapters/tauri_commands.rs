// use core::time;
// use std::sync::Mutex;
use tauri::State;

use super::sqlite_repository::SqliteRepository;
use crate::core::project::{Project, ProjectRepository};
use crate::core::todo::{Todo, TodoRepository};
use crate::core::worktime::{WorkTime, WorkTimeRepository};

pub struct AppState {
    db: SqliteRepository,
}

impl AppState {
    pub fn new(path: &str) -> Self {
        Self {
            db: SqliteRepository::new(path).expect("Failed to create default db"),
        }
    }
}

#[tauri::command]
pub fn get_projects(state: State<AppState>) -> Result<Vec<Project>, String> {
    state.db.get_projects().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn add_project(state: State<AppState>, name: String) -> Result<Project, String> {
    let project = Project::new(name);
    state.db.add_project(&project).map_err(|e| e.to_string())?;
    dbg!(&project);
    Ok(project)
}

#[tauri::command]
pub fn get_todos_by_project(
    state: State<AppState>,
    project_id: String,
) -> Result<Vec<Todo>, String> {
    state
        .db
        .get_todos_by_project(&project_id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn add_todo(
    state: State<AppState>,
    project_id: String,
    description: String,
) -> Result<Todo, String> {
    let todo = Todo::new(project_id, description);
    dbg!(&todo);
    state.db.add_todo(&todo).map_err(|e| e.to_string())?;
    Ok(todo)
}

#[tauri::command]
pub fn get_worktimes_by_project(
    state: State<AppState>,
    project_id: String,
) -> Result<Vec<WorkTime>, String> {
    state
        .db
        .get_worktimes_by_project(&project_id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn start_measure_worktime(
    state: State<AppState>,
    project_id: String,
    description: String,
) -> Result<WorkTime, String> {
    let worktime = WorkTime::new(project_id, description);
    dbg!(&worktime);
    state
        .db
        .add_worktime(&worktime)
        .map_err(|e| e.to_string())?;
    Ok(worktime)
}

#[tauri::command]
pub fn stop_measure_worktime(
    state: State<AppState>,
    timer_id: String,
) -> Result<WorkTime, String> {
    // let mut worktime = state
    //     .db
    //     .update_worktime(&timer_id)
    //     .map_err(|e| e.to_string())?;
    // worktime.running = false;
    // state
    //     .db
    //     .update_worktime(&worktime)
    //     .map_err(|e| e.to_string())?;
    // Ok(worktime)
    Ok(WorkTime::new("".to_string(), "".to_string()))
}