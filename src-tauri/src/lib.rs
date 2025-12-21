mod adapters;
mod core;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let state = adapters::tauri_commands::AppState::new();
    tauri::Builder::default()
        .manage(state)
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            adapters::tauri_commands::add_project,
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
