#[derive(Debug, Clone, serde::Serialize)]
pub struct WorkSession {
    pub id: String,
    pub project_id: String,
    pub description: String,
    pub start: i64,
    pub end: i64,
}

impl WorkSession {
    pub fn new(project_id: String, description: String, start: i64, end: i64) -> Self {
        Self {
            id: uuid::Uuid::new_v4().to_string(),
            project_id: project_id,
            description: description,
            start: start,
            end: end
        }
    }
}

pub trait WorkSessionRepository {
    type Error;

    fn add_work_session(&self, work_session: &WorkSession) -> Result<(), Self::Error>;
    fn get_work_sessions_by_project(&self, project_id: &str) -> Result<Vec<WorkSession>, Self::Error>;
}