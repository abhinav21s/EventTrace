use std::fs::File;
use chrono::Local;
use std::fs::OpenOptions;
use std::io::{self, Read, Write};
use std::sync::{OnceLock ,Mutex};
use std::path::Path;
pub static FILE_NAME: OnceLock<Mutex<String>> = OnceLock::new();

pub fn init_filename(){
    let _=FILE_NAME.set(Mutex::new(String::new()));
}
pub fn create_filename(folderPath:String)  {
     let now = Local::now();
    let timestamp = now.format("%Y-%m-%d_%H-%M-%S");

    let full_path = Path::new(&folderPath)
        .join(format!("activity_{}.csv", timestamp));

    let mut filename = FILE_NAME.get().unwrap().lock().unwrap();
    *filename = full_path.to_string_lossy().to_string();
}

pub fn file_creation_and_write(msg: String) -> io::Result<()> {
    let filename = FILE_NAME.get().unwrap().lock().unwrap();
    // Opens with read/write access, creating the file if it doesn't exist
    let mut file = OpenOptions::new()
        .append(true)
        .create(true)
        .open(&*filename)?;

    // The file handle stays open here for any mixed I/O operations

    // ------  Two ways to write the events and times in the file   ---------
    //write_all accepts an u8 array so first get the foramtted string  and then format it to bytes using as_bytes()
    //Another way is to use the writeln!() which does converts it to bytes and its the shorthand of the two
    file.write_all(msg.as_bytes())?;

    Ok(())
}
