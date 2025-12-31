mod adapters;
mod core;
use std::fs;
use tauri::Manager;
// use tauri::{App, AppHandle};
use tauri_plugin_log;
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::new()
                .level(tauri_plugin_log::log::LevelFilter::Info)
                .build(),
        )
        //.manage(state)
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_log::Builder::new()
                .target(tauri_plugin_log::Target::new(
                    tauri_plugin_log::TargetKind::Stdout,
                ))
                .build(),
        )
        .setup(|app| {
            let app_data_path = app
                .path()
                .app_data_dir()
                .expect("Failed to get app data directory");
            fs::create_dir_all(&app_data_path).expect("Failed to create app data dir");
            let state = adapters::tauri_commands::AppState::new(
                app_data_path.join("app_data.db").to_str().unwrap(),
            );
            app.manage(state);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            adapters::tauri_commands::add_project,
            adapters::tauri_commands::get_projects,
            adapters::tauri_commands::get_todos_by_project,
            adapters::tauri_commands::add_todo,
            adapters::tauri_commands::add_work_session,
            adapters::tauri_commands::get_work_sessions_by_project,
            adapters::tauri_commands::get_work_sessions,
            adapters::tauri_commands::update_work_session,
            adapters::tauri_commands::remove_work_session,
            adapters::tauri_commands::remove_project,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
