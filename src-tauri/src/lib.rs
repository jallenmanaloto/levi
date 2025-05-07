mod db;

use crate::db::{
    add_note, add_task, delete_note, delete_task, get_notes, get_tasks, init_db, update_note,
    update_task, Note, Task,
};
use rusqlite::Result;
use tauri::{Emitter, Manager, WebviewUrl, WebviewWindowBuilder};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            greet,
            add_task_command,
            update_task_command,
            get_tasks_command,
            delete_task_command,
            add_note_command,
            get_notes_command,
            update_note_command,
            delete_note_command,
            create_voice_window
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

#[tauri::command]
fn add_note_command(note: String, task_id: i32) -> Result<(), String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    add_note(&conn, &note, task_id).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_notes_command(task_id: i32) -> Result<Vec<Note>, String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    get_notes(&conn, task_id).map_err(|e| e.to_string())
}

#[tauri::command]
fn update_note_command(note: String, id: i32) -> Result<(), String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    update_note(&conn, id, &note).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn delete_note_command(id: i32) -> Result<(), String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    delete_note(&conn, id).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn create_voice_window(app_handle: tauri::AppHandle) -> Result<(), String> {
    if let Some(existing_window) = app_handle.get_webview_window("voice") {
        existing_window.set_focus().map_err(|e| e.to_string())?;
        return Ok(());
    }

    let voice_window =
        WebviewWindowBuilder::new(&app_handle, "voice", WebviewUrl::App("voice".into()))
            .title("Voice")
            .inner_size(300.0, 200.0)
            .max_inner_size(300.0, 80.0)
            .resizable(false)
            .decorations(false)
            .always_on_top(true)
            .build()
            .map_err(|e| e.to_string())?;

    let app_clone = app_handle.clone();
    voice_window.on_window_event(move |event| match &event {
        tauri::WindowEvent::CloseRequested { api: _, .. } => {
            if let Err(e) = app_clone.emit("voice-window-closed", {}) {
                eprintln!("Failed to emit voice-window-closed event: {}", e);
            }
        }
        _ => {}
    });

    Ok(())
}
