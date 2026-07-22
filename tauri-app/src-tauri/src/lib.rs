// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod listener;
mod logger;
use crate::listener::AnalyticsResponse;
use std::sync::OnceLock;
use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
    Manager,
};
use tauri_plugin_dialog::DialogExt;

#[tauri::command]

fn start_logging(folderPath: String) {
    logger::init_filename();
    logger::create_filename(folderPath);

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
#[tauri::command]
fn display_count() -> AnalyticsResponse {
    listener::display_count()
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
            let start = MenuItem::with_id(app, "start", "▶ Start Logging", true, None::<&str>)?;

            let pause = MenuItem::with_id(app, "pause", "⏸ Pause Logging", true, None::<&str>)?;

            let resume = MenuItem::with_id(app, "resume", "▶ Resume Logging", true, None::<&str>)?;

            let new_session_item =
                MenuItem::with_id(app, "new_session", "🆕 New Session", true, None::<&str>)?;

            let stop = MenuItem::with_id(app, "stop", "⏹ Stop Logging", true, None::<&str>)?;

            let show = MenuItem::with_id(app, "show", "🖥 Show Window", true, None::<&str>)?;

            let exit = MenuItem::with_id(app, "exit", "❌ Exit", true, None::<&str>)?;

            let menu = Menu::with_items(
                app,
                &[
                    &start,
                    &pause,
                    &resume,
                    &new_session_item,
                    &stop,
                    &show,
                    &exit,
                ],
            )?;

            let icon = app
                .default_window_icon()
                .expect("default icon not found")
                .clone();

            TrayIconBuilder::new()
                .icon(icon)
                .menu(&menu)
                .on_menu_event(|app, event| match event.id().as_ref() {
                    "start" => {
                        println!("Start clicked");
                        let app = app.clone();

                        app.dialog().file().pick_folder(move |folder| {
                            if let Some(folder) = folder {
                                let path = folder.to_string();

                                println!("Selected folder: {}", path);

                                start_logging(path);
                            }
                        });
                    }

                    "pause" => {
                        println!("Pause clicked");
                        pause_event();
                    }

                    "resume" => {
                        println!("Resume clicked");
                        resume_event();
                    }

                    "new_session" => {
                        println!("New Session clicked");
                        let app = app.clone();

                        app.dialog().file().pick_folder(move |folder| {
                            println!("Folder callback reached");

                            if let Some(folder) = folder {
                                let path = folder.to_string();

                                println!("Selected folder: {}", path);

                                new_session(path);

                                println!("new_session() finished");
                            } else {
                                println!("No folder selected");
                            }
                        });
                    }

                    "stop" => {
                        println!("Stop clicked");
                        stop_logging();
                    }
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
            listener::init_state();
            Ok(())
        })
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            start_logging,
            pause_event,
            resume_event,
            stop_logging,
            new_session,
            display_count
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
