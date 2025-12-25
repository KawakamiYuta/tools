#[derive(Debug, Clone, serde::Serialize)]
pub struct WorkTime {
    pub id: String,
    pub project_id: String,
    pub description: String,
    pub start: i64,
    pub end: i64,
    pub running: bool,
}

impl WorkTime {
    pub fn new(project_id: String, description: String) -> Self {
        Self {
            id: uuid::Uuid::new_v4().to_string(),
            project_id: project_id,
            description: description,
            start: chrono::Utc::now().timestamp(),
            end: -1,
            running: false,
        }
    }
}

pub trait WorkTimeRepository {
    type Error;

    fn add_worktime(&self, worktime: &WorkTime) -> Result<(), Self::Error>;
    fn update_worktime(&self, worktime: &WorkTime) -> Result<(), Self::Error>;
    fn get_worktimes_by_project(&self, project_id: &str) -> Result<Vec<WorkTime>, Self::Error>;
}