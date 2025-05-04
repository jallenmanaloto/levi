mod db;

use crate::db::{add_task, delete_task, get_tasks, init_db, update_task, Task};
use rusqlite::Result;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            add_task_command,
            update_task_command,
            get_tasks_command,
            delete_task_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn add_task_command(title: String) -> Result<(), String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    add_task(&conn, &title).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_tasks_command() -> Result<Vec<Task>, String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    get_tasks(&conn).map_err(|e| e.to_string())
}

#[tauri::command]
fn update_task_command(id: i32, new_title: String, new_status: String) -> Result<(), String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    update_task(&conn, id, &new_title, &new_status).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn delete_task_command(id: i32) -> Result<(), String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    delete_task(&conn, id).map_err(|e| e.to_string())?;
    Ok(())
}
