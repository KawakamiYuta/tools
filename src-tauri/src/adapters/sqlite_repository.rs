use rusqlite::{Connection, Result};

use crate::core::project::{Project, ProjectRepository};
use crate::core::todo::{Todo, TodoRepository};
use crate::core::work_session::{WorkSession, WorkSessionRepository};

pub struct SqliteRepository {
    pub path: String,
}

impl SqliteRepository {
    pub fn new(db_path: &str) -> rusqlite::Result<Self> {
        let conn = Connection::open(db_path)?;

        conn.execute_batch(
            r#"
CREATE TABLE IF NOT EXISTS todos (
            id TEXT PRIMARY KEY,
            project TEXT NOT NULL,
            task TEXT NOT NULL,
            completed INTEGER NOT NULL,
            created_at INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            created_at INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS worktimes (
            id TEXT PRIMARY KEY,
            project_id TEXT NOT NULL,
            description TEXT NOT NULL,
            start INTEGER NOT NULL,
            end INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS work_sessions (
            id TEXT PRIMARY KEY,
            project_id TEXT,
            description TEXT NOT NULL,
            start INTEGER NOT NULL,
            end INTEGER NOT NULL
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

    fn remove_project(&self, project_id: &str) -> std::result::Result<(), Self::Error> {
        let conn = Connection::open(&self.path)?;
        conn.execute(
            "DELETE FROM projects WHERE id = ?1",
            rusqlite::params![project_id],
        )?;
        Ok(())
    }

    fn get_project_by_id(&self, project_id: &str) -> Result<Option<Project>, Self::Error> {
        let conn = Connection::open(&self.path)?;
        let mut stmt = conn.prepare("SELECT id, name, created_at FROM projects WHERE id = ?1")?;
        let mut project_iter = stmt.query_map(rusqlite::params![project_id], |row| {
            Ok(Project {
                id: row.get(0)?,
                name: row.get(1)?,
                created_at: row.get(2)?,
            })
        })?;

        if let Some(project) = project_iter.next() {
            Ok(Some(project?))
        } else {
            Ok(None)
        }
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

impl TodoRepository for SqliteRepository {
    type Error = rusqlite::Error;

    fn add_todo(&self, todo: &Todo) -> Result<(), Self::Error> {
        let conn = Connection::open(&self.path)?;
        conn.execute(
            "INSERT INTO todos (id, project, task, completed, created_at) VALUES (?1, ?2, ?3, ?4, ?5)",
            rusqlite::params![
                todo.id,
                todo.project_id,
                todo.description,
                todo.completed,
                todo.created_at
            ],
        )?;
        Ok(())
    }

    fn get_todos_by_project(&self, project_id: &str) -> Result<Vec<Todo>, Self::Error> {
        let conn = Connection::open(&self.path)?;
        let mut stmt = conn.prepare(
            "SELECT id, project, task, completed, created_at FROM todos WHERE project = ?1",
        )?;
        let todo_iter = stmt.query_map(rusqlite::params![project_id], |row| {
            Ok(Todo {
                id: row.get(0)?,
                project_id: row.get(1)?,
                description: row.get(2)?,
                completed: row.get(3)?,
                created_at: row.get(4)?,
            })
        })?;

        let mut todos = Vec::new();
        for todo in todo_iter {
            todos.push(todo?);
        }
        Ok(todos)
    }
}

impl WorkSessionRepository for SqliteRepository {
    type Error = rusqlite::Error;

    fn add_work_session(&self, work_session: &WorkSession) -> Result<(), Self::Error> {
        let conn = Connection::open(&self.path)?;
        conn.execute(
            "INSERT INTO work_sessions (id, project_id, description, start, end) VALUES (?1, ?2, ?3, ?4, ?5)",
            rusqlite::params![
                work_session.id,
                work_session.project_id,
                work_session.description,
                work_session.start,
                work_session.end
            ],
        )?;
        Ok(())
    }

    fn update_work_session(&self, work_session: &WorkSession) -> std::result::Result<(), Self::Error> {
        let conn = Connection::open(&self.path)?;
        conn.execute(
            "UPDATE work_sessions SET project_id = ?1, description = ?2, start = ?3, end = ?4 WHERE id = ?5",
            rusqlite::params![
                work_session.project_id,
                work_session.description,
                work_session.start,
                work_session.end,
                work_session.id
            ],
        )?;
        Ok(())
    }

    fn remove_work_session(&self, work_session_id: &str) -> std::result::Result<(), Self::Error> {
        let conn = Connection::open(&self.path)?;
        conn.execute(
            "DELETE FROM work_sessions WHERE id = ?1",
            rusqlite::params![work_session_id],
        )?;
        Ok(())
    }

    fn get_work_sessions(&self) -> std::result::Result<Vec<WorkSession>, Self::Error> {
        let conn = Connection::open(&self.path)?;
        let mut stmt = conn.prepare("SELECT id, project_id, description, start, end FROM work_sessions")?;
        let worktime_iter = stmt.query_map([], |row| {
            Ok(WorkSession {
                id: row.get(0)?,
                project_id: row.get(1)?,
                description: row.get(2)?,
                start: row.get(3)?,
                end: row.get(4)?,
            })
        })?;

        let mut worktimes = Vec::new();
        for worktime in worktime_iter {
            worktimes.push(worktime?);
        }
        Ok(worktimes)
    }

    fn get_work_sessions_by_project(&self, project_id: &str) -> Result<Vec<WorkSession>, Self::Error> {
        let conn = Connection::open(&self.path)?;
        let mut stmt = conn.prepare(
            "SELECT id, project_id, description, start, end, running FROM worktimes WHERE project_id = ?1",
        )?;
        let worktime_iter = stmt.query_map(rusqlite::params![project_id], |row| {
            Ok(WorkSession {
                id: row.get(0)?,
                project_id: row.get(1)?,
                description: row.get(2)?,
                start: row.get(3)?,
                end: row.get(4)?,
            })
        })?;

        let mut worktimes = Vec::new();
        for worktime in worktime_iter {
            worktimes.push(worktime?);
        }
        Ok(worktimes)
    }
}