#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct WorkSession {
    pub id: String,
    pub project_id: Option<String>,
    pub description: String,
    pub start: i64,
    pub end: i64,
}

impl WorkSession {
    pub fn new(project_id: Option<String>, description: String, start: i64, end: i64) -> Self {
        Self {
            id: uuid::Uuid::new_v4().to_string(),
            project_id: project_id,
            description: description,
            start: start,
            end: end
        }
    }

    pub fn get_duration_seconds(&self) -> i64 {
        (self.end - self.start) / 1000
    }
}

pub trait WorkSessionRepository {
    type Error;

    fn add_work_session(&self, work_session: &WorkSession) -> Result<(), Self::Error>;
    fn update_work_session(&self, work_session: &WorkSession) -> Result<(), Self::Error>;
    fn remove_work_session(&self, work_session_id: &str) -> Result<(), Self::Error>;
    fn get_work_sessions_by_project(&self, project_id: &str) -> Result<Vec<WorkSession>, Self::Error>;
    fn get_work_sessions(&self) -> Result<Vec<WorkSession>, Self::Error>;
}