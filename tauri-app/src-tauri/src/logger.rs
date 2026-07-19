
pub fn create_filename()->String{
    let now=Local::now();
    let timestamp=now.format("%Y-%m-%d_%H-%M-%S");
    format!("activity_{}.csv",timestamp)
}

pub fn file_creation_and_write(msg:String) -> io::Result<()> {
    let filename=create_filename();
    // Opens with read/write access, creating the file if it doesn't exist
    let mut file = OpenOptions::new()
        .append(true)
        .create(true)
        .open(filename)?;

    // The file handle stays open here for any mixed I/O operations

     // ------  Two ways to write the events and times in the file   ---------
     //write_all accepts an u8 array so first get the foramtted string  and then format it to bytes using as_bytes()
     //Another way is to use the writeln!() which does converts it to bytes and its the shorthand of the two  
     file.write_all(msg.as_bytes())?;
    
   Ok(())
     
}