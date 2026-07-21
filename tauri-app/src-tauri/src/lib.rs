// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod listener;
mod logger;
use tauri::image::Image;
use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
    Manager,
};
#[tauri::command]

fn start_logging(folderPath: String) {
    logger::init_filename();
    logger::create_filename(folderPath);
    listener::init_state();
    std::thread::spawn(|| {
        listener::call_listener();
    });
}
#[tauri::command]
fn pause_event() {
    listener::pause_event();
}
#[tauri::command]
fn resume_event() {
    listener::resume_event();
}
#[tauri::command]
fn new_session(folderPath: String) {
    listener::new_session(folderPath)
}
#[tauri::command]
fn stop_logging() {
    listener::stop_logging();
}
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::CloseRequested { api, .. } = event {
                println!("Close button pressed");

                api.prevent_close();

                window.hide().unwrap();
            }
        })
        .setup(|app| {
            let show = MenuItem::with_id(app, "show", "Show Window", true, None::<&str>)?;

            let exit = MenuItem::with_id(app, "exit", "Exit", true, None::<&str>)?;

            let menu = Menu::with_items(app, &[&show, &exit])?;
            let icon = app
                .default_window_icon()
                .expect("default icon not found")
                .clone();

            TrayIconBuilder::new()
                .icon(icon)
                .menu(&menu)
                .on_menu_event(|app, event| match event.id().as_ref() {
                    "show" => {
                        let window = app.get_webview_window("main").unwrap();

                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }

                    "exit" => {
                        println!("Exit clicked");
                        app.exit(0);
                    }

                    _ => {}
                })
                .build(app)?;

            Ok(())
        })
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            start_logging,
            pause_event,
            resume_event,
            stop_logging,
            new_session
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
