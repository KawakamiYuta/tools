use crate::core::worktime::WorkTime;

pub struct WorkTimeTracker {
    currentsession: Option<WorkTime>,
}