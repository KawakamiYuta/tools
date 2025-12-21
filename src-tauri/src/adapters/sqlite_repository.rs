use rusqlite::{Connection, Result};

use crate::core::entity::{Project, ProjectRepository};

pub struct SqliteRepository {
    pub path: String,
}

impl SqliteRepository {
    pub fn new(db_path: &str) -> rusqlite::Result<Self> {
        let conn = Connection::open(db_path)?;

        conn.execute_batch(
            r#"
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project TEXT NOT NULL,
            task TEXT NOT NULL,
            completed BOOLEAN NOT NULL
        );

        CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            created_at INTEGER NOT NULL
        );
        "#,
        )?;

        Ok(Self {
            path: db_path.to_string(),
        })
    }
}

impl Default for SqliteRepository {
    fn default() -> Self {
        Self::new("app_data.db").expect("Failed to create default db")
    }
}

impl ProjectRepository for SqliteRepository {
    type Error = rusqlite::Error;

    fn add_project(&self, project: &Project) -> Result<(), Self::Error> {
        let conn = Connection::open(&self.path)?;
        conn.execute(
            "INSERT INTO projects (id, name, created_at) VALUES (?1, ?2, ?3)",
            rusqlite::params![project.id, project.name, project.created_at],
        )?;
        Ok(())
    }

    fn get_projects(&self) -> Result<Vec<Project>, Self::Error> {
        let conn = Connection::open(&self.path)?;
        let mut stmt = conn.prepare("SELECT id, name, created_at FROM projects")?;
        let project_iter = stmt.query_map([], |row| {
            Ok(Project {
                id: row.get(0)?,
                name: row.get(1)?,
                created_at: row.get(2)?,
            })
        })?;

        let mut projects = Vec::new();
        for project in project_iter {
            projects.push(project?);
        }
        dbg!(&projects);
        Ok(projects)
    }
}
