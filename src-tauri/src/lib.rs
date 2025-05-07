mod db;
mod logger;

use crate::db::{
    add_note, add_task, delete_note, delete_task, get_notes, get_tasks, init_db, update_note,
    update_task, Note, Task,
};
use logger::{init_logger, log_to_file, LOG_FILE};
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
    if LOG_FILE.lock().unwrap().is_none() {
        if let Err(e) = init_logger() {
            eprintln!("Logger initialization failed: {}", e);
        }
    }
    log_to_file(&format!("Adding task: {}", &title))?;

    match init_db() {
        Ok(conn) => match add_task(&conn, &title) {
            Ok(_) => {
                log_to_file("Successfully added task.")?;
            }
            Err(e) => {
                let error_msg = format!("Failed to add task: {}", e);
                log_to_file(&error_msg)?;
            }
        },
        Err(e) => {
            let error_msg = format!("Failed to initialize database: {}", e);
            log_to_file(&error_msg)?;
        }
    }
    Ok(())
}

#[tauri::command]
fn get_tasks_command() -> Result<Vec<Task>, String> {
    if LOG_FILE.lock().unwrap().is_none() {
        if let Err(e) = init_logger() {
            eprintln!("Logger initialization failed: {}", e);
        }
    }
    log_to_file(&format!("Getting all tasks"))?;

    match init_db() {
        Ok(conn) => match get_tasks(&conn) {
            Ok(tasks) => {
                log_to_file("Successfully get all tasks.")?;
                Ok(tasks)
            }
            Err(e) => {
                let error_msg = format!("Failed to get all tasks: {}", e);
                log_to_file(&error_msg)?;
                Err(error_msg)
            }
        },
        Err(e) => {
            let error_msg = format!("Failed to initialize database: {}", e);
            log_to_file(&error_msg)?;
            Err(error_msg)
        }
    }
}

#[tauri::command]
fn update_task_command(id: i32, new_title: String, new_status: String) -> Result<(), String> {
    if LOG_FILE.lock().unwrap().is_none() {
        if let Err(e) = init_logger() {
            eprintln!("Logger initialization failed: {}", e);
        }
    }
    log_to_file(&format!(
        "Updating task with id: {}, new title: {}, new status: {}",
        &id, &new_title, &new_status
    ))?;

    match init_db() {
        Ok(conn) => match update_task(&conn, id, &new_title, &new_status) {
            Ok(_) => {
                log_to_file("Successfully get all tasks.")?;
            }
            Err(e) => {
                let error_msg = format!("Failed to get all tasks: {}", e);
                log_to_file(&error_msg)?;
            }
        },
        Err(e) => {
            let error_msg = format!("Failed to initialize database: {}", e);
            log_to_file(&error_msg)?;
        }
    }

    log_to_file(&format!("Successfully updated task."))?;
    Ok(())
}

#[tauri::command]
fn delete_task_command(id: i32) -> Result<(), String> {
    if LOG_FILE.lock().unwrap().is_none() {
        if let Err(e) = init_logger() {
            eprintln!("Logger initialization failed: {}", e);
        }
    }
    log_to_file(&format!("Deleting task with id: {}", &id))?;

    match init_db() {
        Ok(conn) => match delete_task(&conn, id) {
            Ok(_) => {
                log_to_file("Successfully deleted task.")?;
            }
            Err(e) => {
                let error_msg = format!("Failed to delete task: {}", e);
                log_to_file(&error_msg)?;
            }
        },
        Err(e) => {
            let error_msg = format!("Failed to initialize database: {}", e);
            log_to_file(&error_msg)?;
        }
    }

    Ok(())
}

#[tauri::command]
fn add_note_command(note: String, task_id: i32) -> Result<(), String> {
    if LOG_FILE.lock().unwrap().is_none() {
        if let Err(e) = init_logger() {
            eprintln!("Logger initialization failed: {}", e);
        }
    }
    log_to_file(&format!("Adding note: {}", &note))?;

    match init_db() {
        Ok(conn) => match add_note(&conn, &note, task_id) {
            Ok(_) => {
                log_to_file("Successfully add note.")?;
            }
            Err(e) => {
                let error_msg = format!("Failed to add note: {}", e);
                log_to_file(&error_msg)?;
            }
        },
        Err(e) => {
            let error_msg = format!("Failed to initialize database: {}", e);
            log_to_file(&error_msg)?;
        }
    }

    Ok(())
}

#[tauri::command]
fn get_notes_command(task_id: i32) -> Result<Vec<Note>, String> {
    if LOG_FILE.lock().unwrap().is_none() {
        if let Err(e) = init_logger() {
            eprintln!("Logger initialization failed: {}", e);
        }
    }
    log_to_file(&format!("Getting all notes"))?;

    match init_db() {
        Ok(conn) => match get_notes(&conn, task_id) {
            Ok(notes) => {
                log_to_file("Successfully get notes.")?;
                Ok(notes)
            }
            Err(e) => {
                let error_msg = format!("Failed to get notes: {}", e);
                log_to_file(&error_msg)?;
                Err(error_msg)
            }
        },
        Err(e) => {
            let error_msg = format!("Failed to initialize database: {}", e);
            log_to_file(&error_msg)?;
            Err(error_msg)
        }
    }
}

#[tauri::command]
fn update_note_command(note: String, id: i32) -> Result<(), String> {
    if LOG_FILE.lock().unwrap().is_none() {
        if let Err(e) = init_logger() {
            eprintln!("Logger initialization failed: {}", e);
        }
    }
    log_to_file(&format!(
        "Updating note with id: {}, new note: {}",
        &id, &note
    ))?;

    match init_db() {
        Ok(conn) => match update_note(&conn, id, &note) {
            Ok(_) => {
                log_to_file("Successfully update note.")?;
            }
            Err(e) => {
                let error_msg = format!("Failed to update note: {}", e);
                log_to_file(&error_msg)?;
            }
        },
        Err(e) => {
            let error_msg = format!("Failed to initialize database: {}", e);
            log_to_file(&error_msg)?;
        }
    }

    Ok(())
}

#[tauri::command]
fn delete_note_command(id: i32) -> Result<(), String> {
    if LOG_FILE.lock().unwrap().is_none() {
        if let Err(e) = init_logger() {
            eprintln!("Logger initialization failed: {}", e);
        }
    }
    log_to_file(&format!("Deleting note with id: {}", &id))?;

    match init_db() {
        Ok(conn) => match delete_note(&conn, id) {
            Ok(_) => {
                log_to_file("Successfully deleted note.")?;
            }
            Err(e) => {
                let error_msg = format!("Failed to delete note: {}", e);
                log_to_file(&error_msg)?;
            }
        },
        Err(e) => {
            let error_msg = format!("Failed to initialize database: {}", e);
            log_to_file(&error_msg)?;
        }
    }

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
