// use core::time;
// use std::sync::Mutex;
use tauri::State;

use super::sqlite_repository::SqliteRepository;
use crate::core::project::{Project, ProjectRepository};
use crate::core::todo::{Todo, TodoRepository};
use crate::core::work_session::{WorkSession, WorkSessionRepository};

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
pub fn get_work_sessions_by_project(
    state: State<AppState>,
    project_id: String,
) -> Result<Vec<WorkSession>, String> {
    state
        .db
        .get_work_sessions_by_project(&project_id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_work_sessions(state: State<AppState>) -> Result<Vec<WorkSession>, String> {
    // Implement a method in the repository to get all work sessions
    state
        .db
        .get_work_sessions()
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn add_work_session(
    state: State<AppState>,
    project_id: Option<String>,
    description: String,
    start: i64,
    end: i64
) -> Result<WorkSession, String> {
    let worktime = WorkSession::new(project_id, description, start, end);
    dbg!(&worktime);
    state
        .db
        .add_work_session(&worktime)
        .map_err(|e| e.to_string())?;
    Ok(worktime)
}

#[tauri::command]
pub fn update_work_session(
    state: State<AppState>,
    work_session: WorkSession,
) -> Result<(), String> {
    state
        .db
        .update_work_session(&work_session)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn remove_work_session(
    state: State<AppState>,
    work_session_id: String,
) -> Result<(), String> {
    state
        .db
        .remove_work_session(&work_session_id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn remove_project(
    state: State<AppState>,
    project_id: String,
) -> Result<(), String> {
    state
        .db
        .remove_project(&project_id)
        .map_err(|e| e.to_string())
}