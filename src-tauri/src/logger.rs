use chrono::Local;
use log::info;
use once_cell::sync::Lazy;
use std::fs::{File, OpenOptions};
use std::io::Write;
use std::sync::Mutex;

pub static LOG_FILE: Lazy<Mutex<Option<File>>> = Lazy::new(|| Mutex::new(None));

pub fn init_logger() -> Result<(), String> {
    let app_data_dir = dirs::data_dir()
        .ok_or("Could not find app data directory".to_string())?
        .join("levi");

    std::fs::create_dir_all(&app_data_dir)
        .map_err(|e| format!("Could not create app directory: {}", e))?;
    let log_path = app_data_dir.join("app.log");

    let file = OpenOptions::new()
        .create(true)
        .append(true)
        .open(&log_path)
        .map_err(|e| format!("Could not open log file: {}", e))?;

    *LOG_FILE.lock().unwrap() = Some(file);

    info!("Logging initialized at: {}", log_path.display());
    Ok(())
}

pub fn log_to_file(message: &str) -> Result<(), String> {
    let timestamp = Local::now().format("%Y-%m-%d %H:%M:%S%.3f").to_string();
    let log_entry = format!("[{}] {}\n", timestamp, message);

    let mut guard = LOG_FILE.lock().unwrap();
    if let Some(file) = guard.as_mut() {
        file.write_all(log_entry.as_bytes())
            .map_err(|e| format!("Failed to write to log file: {}", e))?;
        file.flush()
            .map_err(|e| format!("Failed to flush log file: {}", e))?;
    } else {
        return Err("Log file not initialized".to_string());
    }

    Ok(())
}
