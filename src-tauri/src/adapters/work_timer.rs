use std::sync::{Arc, Mutex};
use once_cell;
use std::time::{Instant, Duration};

pub struct WorkTimer {
    start: Option<Instant>,
    project_id: Option<String>,
}

static TIMER: once_cell::sync::Lazy<Arc<Mutex<WorkTimer>>> =
    once_cell::sync::Lazy::new(|| {
        Arc::new(Mutex::new(WorkTimer {
            start: None,
            project_id: None,
        }))
    });

// fn start_tick(app: tauri::AppHandle) {
//     tauri::async_runtime::spawn(async move {
//         loop {
//             tauri::async_runtime::sleep(Duration::from_secs(1)).await;

//             let state = {
//                 let timer = TIMER.lock().unwrap();
//                 match timer.start {
//                     Some(start) => WorkTimeState {
//                         project_id: timer.project_id,
//                         running: true,
//                         elapsed_seconds: start.elapsed().as_secs() as i64,
//                     },
//                     None => WorkTimeState {
//                         project_id: None,
//                         running: false,
//                         elapsed_seconds: 0,
//                     },
//                 }
//             };

//             app.emit_all("work_time:update", state).ok();
//         }
//     });
// }
