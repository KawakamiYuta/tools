// use core::time;
// use std::sync::Mutex;
use tauri::State;
use std::collections::HashMap;
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

#[derive(Debug, Clone, serde::Serialize)]
pub struct WorkSessionDto {
    pub id: String,
    pub project_id: Option<String>,
    pub project_name: Option<String>,
    pub description: String,
    pub start: i64,
    pub end: i64,
    pub duration_seconds: i64,
}

impl WorkSessionDto {
   fn from_with_project_name(ws: &WorkSession, project_name: Option<String>) -> Self {
        Self {
            id: ws.id.clone(),
            project_id: ws.project_id.clone(),
            project_name,
            description: ws.description.clone(),
            start: ws.start,
            end: ws.end,
            duration_seconds: ws.get_duration_seconds(),
        }
    }
}

impl From<WorkSessionDto> for WorkSession {
    fn from(dto: WorkSessionDto) -> Self {
        Self {
            id: dto.id,
            project_id: dto.project_id,
            description: dto.description,
            start: dto.start,
            end: dto.end,
        }
    }
}

// impl From<&WorkSession> for WorkSessionDto {
//     fn from(ws: &WorkSession) -> Self {
//         Self {
//             id: ws.id.clone(),
//             project_name: None,
//             description: ws.description.clone(),
//             start: ws.start,
//             end: ws.end,
//             duration_seconds: ws.get_duration_seconds(),
//         }
//     }
// }

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
pub fn get_work_sessions(state: State<AppState>) -> Result<Vec<WorkSessionDto>, String> {
    let projects = state.db.get_projects().map_err(|e| e.to_string())?;
    let project_map: HashMap<String, String> =
        projects.into_iter().map(|p| (p.id.clone(), p.name)).collect();

    state
        .db
        .get_work_sessions()
        .map_err(|e| e.to_string())
        .map(|sessions| {
            sessions
                .iter()
                .map(|s| {
                    let project_name = s
                        .project_id
                        .as_ref()
                        .and_then(|id| project_map.get(id).cloned());
                    WorkSessionDto::from_with_project_name(s, project_name)
                })
                .collect::<Vec<_>>()
                .into_iter()
                .rev()
                .collect()
        })
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