use tauri::{App, State};
use std::sync::Mutex;

use crate::core::entity::{Project, ProjectRepository};
use super::sqlite_repository::SqliteRepository;

pub struct AppState {
    db: std::sync::Mutex<SqliteRepository>,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            db: Mutex::new(SqliteRepository::default()),
        }
    }
}

#[tauri::command]
pub fn get_projects(state: State<AppState>) -> Result<Vec<Project>, String> {
    let db = state.db.lock().unwrap();
    db.get_projects().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn add_project(state: State<AppState>, name: String) -> Result<Project, String> {
    let project = Project::new(name);
    let db = state.db.lock().unwrap();
    db.add_project(&project).map_err(|e| e.to_string())?;

    Ok(project)
}
