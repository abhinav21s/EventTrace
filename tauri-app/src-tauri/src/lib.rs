// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod logger;
mod listener;

#[tauri::command]

fn start_logging(folderPath:String) {
    logger::create_filename(folderPath);
    std::thread::spawn(|| {
        listener::call_listener();
    });
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {

    tauri::Builder::default()
         .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![start_logging])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
