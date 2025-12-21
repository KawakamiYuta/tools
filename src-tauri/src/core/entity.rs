use serde::Serialize;
use uuid::Uuid;
use chrono::Utc;

#[derive(Debug, Serialize)]
pub struct Project {
    pub id: String,
    pub name: String,
    pub created_at: i64,
}

impl Project {
    pub fn new(name: String) -> Self {
        let id = uuid::Uuid::new_v4().to_string();
        let created_at = chrono::Utc::now().timestamp();
        Self {
            id,
            name,
            created_at,
        }
    }
}

pub trait ProjectRepository {
    type Error; // 実装ごとのエラー型を指定可能にする

    fn add_project(&self, project: &Project) -> Result<(), Self::Error>;
    fn get_projects(&self) -> Result<Vec<Project>, Self::Error>;
}
