// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_sql::{Migration, MigrationKind};

fn main() {
    let migrations = vec![Migration {
        version: 1,
        description: "create_initial_tables",
        sql: "CREATE TABLE Student(Id INTEGER PRIMARY KEY, FullName TEXT NOT NULL, PhoneNumber VARCHAR(10), ParentFullName TEXT NOT NULL, ParentPhoneNumber VARCHAR(10) NOT NULL); CREATE TABLE PaymentHistory(Id INTEGER PRIMARY KEY, StudentId INTEGER, StudentFullName TEXT, PaymentAmount INTEGER NOT NULL, \"DateTime\" REAL NOT NULL, FOREIGN KEY(StudentId) REFERENCES Student(Id) ON DELETE SET NULL); CREATE TABLE Course(Id INTEGER PRIMARY KEY, Name TEXT UNIQUE NOT NULL, Duration INTEGER NOT NULL, Quota INTEGER NOT NULL); CREATE TABLE PlannedCourse(Id INTEGER PRIMARY KEY, CourseId INTEGER NOT NULL, DayOfWeek INTEGER CHECK(DayOfWeek IN(1,2,3,4,5,6,7)), StartTime TIME NOT NULL, FOREIGN KEY(CourseId) REFERENCES Course(Id)); CREATE TABLE PlannedCourseStudent(Id INTEGER PRIMARY KEY, PlannedCourseId INTEGER NOT NULL, StudentId INTEGER NOT NULL, PaymentAmount INTEGER NOT NULL, FOREIGN KEY(PlannedCourseId) REFERENCES PlannedCourse(Id) ON DELETE CASCADE, FOREIGN KEY(StudentId) REFERENCES Student(Id) ON DELETE CASCADE); CREATE TABLE CourseSession(Id INTEGER PRIMARY KEY, CourseName TEXT NOT NULL, \"DateTime\" REAL NOT NULL); CREATE TABLE CourseSessionAttendance(Id INTEGER PRIMARY KEY, CourseSessionId INTEGER NOT NULL, StudentFullName TEXT, StudentId INTEGER, PaymentAmount INTEGER NOT NULL, Duration INTEGER NOT NULL, CourseName TEXT NOT NULL, HasAttended BOOLEAN, FOREIGN KEY(CourseSessionId) REFERENCES CourseSession(Id), FOREIGN KEY(StudentId) REFERENCES Student(Id) ON DELETE SET NULL); CREATE TRIGGER UpdatePaymentHistoryOnStudentDelete BEFORE DELETE ON Student FOR EACH ROW BEGIN UPDATE PaymentHistory SET StudentFullName = OLD.FullName WHERE StudentId = OLD.Id; END; CREATE TRIGGER UpdateCourseSessionAttendanceOnStudentDelete BEFORE DELETE ON Student FOR EACH ROW BEGIN UPDATE CourseSessionAttendance SET StudentFullName = OLD.FullName WHERE StudentId = OLD.Id; END;",
        kind: MigrationKind::Up,
    }];

    match std::env::current_exe() {
        Ok(exe_path) => {
            println!("Current executable path: {}", exe_path.display());
        }
        Err(e) => {
            println!("Failed to get current executable path: {}", e);
        }
    }

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:data.db", migrations)
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
