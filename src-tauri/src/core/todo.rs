use chrono;
use serde::Serialize;
use uuid;

#[derive(Debug, Clone, Serialize)]
pub struct Todo {
    pub id: String,
    pub project_id: String,
    pub description: String,
    pub completed: bool,
    pub created_at: i64,
}

impl Todo {
    pub fn new(project_id: String, description: String) -> Self {
        let id = uuid::Uuid::new_v4().to_string();
        let created_at = chrono::Utc::now().timestamp();
        Self {
            id,
            project_id,
            description,
            completed: false,
            created_at,
        }
    }
}

pub trait TodoRepository {
    type Error; // 実装ごとのエラー型を指定可能にする

    fn add_todo(&self, todo: &Todo) -> Result<(), Self::Error>;
    fn get_todos_by_project(&self, project_id: &str) -> Result<Vec<Todo>, Self::Error>;
}