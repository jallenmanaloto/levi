use crate::logger::{init_logger, log_to_file, LOG_FILE};
use chrono::Utc;
use rusqlite::{Connection, Result};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;

#[derive(Debug, Serialize, Deserialize)]
pub struct Task {
    pub id: i32,
    pub title: String,
    pub status: String,
    pub created_at: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Note {
    pub id: i32,
    pub note: String,
    pub task_id: i32,
    pub timestamp: String,
}

pub fn get_db_path() -> PathBuf {
    if LOG_FILE.lock().unwrap().is_none() {
        if let Err(e) = init_logger() {
            eprintln!("Logger initialization failed: {}", e);
        }
    }

    let base_path = match dirs::data_local_dir() {
        Some(dir) => dir,
        None => {
            let _ = log_to_file(
                "Could not determine local data directory. Using the current directory.",
            );
            PathBuf::from(".")
        }
    };

    base_path.join("levi").join("app.db")
}

pub fn init_db() -> Result<Connection> {
    let db_path = get_db_path();
    let conn = Connection::open(db_path)?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'todo',
            created_at TEXT NOT NULL
        );",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS task_notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_id INTEGER NOT NULL,
            note TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
        );",
        [],
    )?;
    Ok(conn)
}

// ==== Task CRUD Functions ====
pub fn add_task(conn: &Connection, title: &str) -> Result<()> {
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "INSERT INTO tasks (title, created_at) VALUES (?1, ?2)",
        &[title, &now],
    )?;
    Ok(())
}

pub fn get_tasks(conn: &Connection) -> Result<Vec<Task>> {
    let mut statement = conn.prepare("SELECT id, title, status, created_at FROM tasks")?;
    let tasks = statement
        .query_map([], |row| {
            Ok(Task {
                id: row.get(0)?,
                title: row.get(1)?,
                status: row.get(2)?,
                created_at: row.get(3)?,
            })
        })?
        .collect::<Result<Vec<Task>>>()?;
    Ok(tasks)
}

pub fn update_task(conn: &Connection, id: i32, new_title: &str, new_status: &str) -> Result<()> {
    conn.execute(
        "UPDATE tasks SET title = ?1, status = ?2 WHERE id = ?3",
        &[new_title, new_status, &id.to_string()],
    )?;
    Ok(())
}

pub fn delete_task(conn: &Connection, id: i32) -> Result<()> {
    conn.execute("DELETE FROM tasks WHERE id = ?1", &[&id.to_string()])?;
    Ok(())
}

pub fn add_note(conn: &Connection, note: &str, task_id: i32) -> Result<()> {
    let now = Utc::now().to_rfc3339();

    conn.execute(
        "INSERT INTO task_notes (task_id, note, timestamp) VALUES (?1, ?2, ?3)",
        [task_id.to_string(), note.to_owned(), now],
    )?;
    Ok(())
}

pub fn get_notes(conn: &Connection, task_id: i32) -> Result<Vec<Note>> {
    let mut statement =
        conn.prepare("SELECT id, note, task_id, timestamp FROM task_notes WHERE task_id = ?1")?;
    let tasks = statement
        .query_map([task_id], |row| {
            Ok(Note {
                id: row.get(0)?,
                note: row.get(1)?,
                task_id: row.get(2)?,
                timestamp: row.get(3)?,
            })
        })?
        .collect::<Result<Vec<Note>>>()?;
    Ok(tasks)
}

pub fn update_note(conn: &Connection, id: i32, note: &str) -> Result<()> {
    conn.execute(
        "UPDATE task_notes SET note = ?1 WHERE ID = ?2",
        &[note, &id.to_string()],
    )?;
    Ok(())
}

pub fn delete_note(conn: &Connection, id: i32) -> Result<()> {
    conn.execute("DELETE FROM task_notes WHERE id = ?1", [&id.to_string()])?;
    Ok(())
}
