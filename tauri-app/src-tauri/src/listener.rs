use rdev::{Event,EventType,listen,Button};
use crate::logger::file_creation_and_write;
use crate::logger::create_filename;
use std::sync::Mutex;
use std::sync::OnceLock;
use std::sync::atomic::{AtomicI32,Ordering};
#[derive(Debug)]
 enum Loggedstate{
   Paused,
   Logging,
   Stoped
}

static Counter_key:AtomicI32=AtomicI32::new(0);
static Counter_mouse_button_left:AtomicI32=AtomicI32::new(0);
static Counter_mouse_button_right:AtomicI32=AtomicI32::new(0);
static Counter_mouse_button_middle:AtomicI32=AtomicI32::new(0);
static Counter_mouse_move:AtomicI32=AtomicI32::new(0);
static Counter_wheel:AtomicI32=AtomicI32::new(0);
static Session_count:AtomicI32=AtomicI32::new(1);
static CURRENT_STATE:OnceLock<Mutex<Loggedstate>>=OnceLock::new();
pub fn init_state(){
    
    let _= CURRENT_STATE.set(Mutex::new(Loggedstate::Logging));
}


pub fn pause_event(){

let mut state=CURRENT_STATE.get().unwrap().lock().unwrap();
match *state{
        Loggedstate::Paused=>{
            println!("The event is already paused");
        }
        _=>{
            
            *state=Loggedstate::Paused;
            println!("Event Paused -------------------------------------------------------------");
        }
    }
}
    
   

pub fn resume_event(){
    let mut state=CURRENT_STATE.get().unwrap().lock().unwrap();
match *state{
    Loggedstate::Logging=>{
        println!("The event is already resumed");
    }
    _=>{
        
        *state=Loggedstate::Logging;
        println!("Event Resumed-------------------------------------------------------------------");
    }
}
}

pub fn display_count(){
    let session_value=Session_count.load(Ordering::SeqCst);
    println!("{}",session_value);
    let value_k=Counter_key.load(Ordering::SeqCst);
    println!("{}",value_k);
    let value_mouse_m_l=Counter_mouse_button_left.load(Ordering::SeqCst);
    println!("{}",value_mouse_m_l);
    let value_mouse_m_r=Counter_mouse_button_right.load(Ordering::SeqCst);
    println!("{}",value_mouse_m_r);
    let value_mouse_m_m=Counter_mouse_button_middle.load(Ordering::SeqCst);
    println!("{}",value_mouse_m_m);
    let value_wheel=Counter_wheel.load(Ordering::SeqCst);
    println!("{}",value_wheel);
    let value_mouse_mov=Counter_mouse_move.load(Ordering::SeqCst);
    println!("{}",value_mouse_mov);
}

pub fn change_counter(){
    Counter_key.store(0,Ordering::SeqCst);
    Counter_mouse_button_left.store(0,Ordering::SeqCst);
    Counter_mouse_button_right.store(0,Ordering::SeqCst);
    Counter_mouse_button_middle.store(0,Ordering::SeqCst);
    Counter_mouse_move.store(0,Ordering::SeqCst);
    Counter_wheel.store(0,Ordering::SeqCst);
}
pub fn stop_logging() {
    let mut state = CURRENT_STATE.get().unwrap().lock().unwrap();
    display_count();
    match *state {
        Loggedstate::Stoped => {
            println!("Already stopped");
        }
        _ => {
            *state = Loggedstate::Stoped;
            println!("Logging stopped");
        }
    }
}

pub fn new_session(folderPath:String){
    change_counter();
    Session_count.fetch_add(1,Ordering::SeqCst);
    
{
        let mut state = CURRENT_STATE.get().unwrap().lock().unwrap();

        match *state {
            Loggedstate::Logging => {
                println!("Already logging");
                return;
            }
            _ => {}
        }
    }
   
    create_filename(folderPath);

    {
        let mut state = CURRENT_STATE.get().unwrap().lock().unwrap();
        *state = Loggedstate::Logging;
    }

    println!("New logging session started");   
}
pub fn callback(event:Event){

    let should_start={
         let state=CURRENT_STATE.get().unwrap().lock().unwrap();

         matches!(*state,Loggedstate::Logging )
    };
   
   if !should_start {
    return;
   }
    println!("{:?}", event.event_type);
    match event.event_type{
        EventType::KeyPress(key)=>{
         Counter_key.fetch_add(1,Ordering::SeqCst);
       let msg=format!("Key pressed is {:?} at time {:?}\n",key,event.time);
       file_creation_and_write(msg);
    }
    EventType::KeyRelease(key)=>{
        let msg=format!("Key released is {:?} at time {:?}\n",key,event.time);
        file_creation_and_write(msg);
    }
    EventType::ButtonPress(Button::Left)=>{
        Counter_mouse_button_left.fetch_add(1,Ordering::SeqCst);
       let msg=format!("Button Pressed is {:?} at time {:?}\n",Button::Left,event.time);
       file_creation_and_write(msg);
    }
    EventType::ButtonPress(Button::Right)=>{
         Counter_mouse_button_right.fetch_add(1,Ordering::SeqCst);
        let msg=format!("Button Pressed is {:?} at time {:?}\n",Button::Right,event.time);
        file_creation_and_write(msg);
    }
    EventType::ButtonPress(Button::Middle)=>{
          Counter_mouse_button_middle.fetch_add(1,Ordering::SeqCst);
        let msg=format!("Button Pressed is {:?} at time {:?}\n",Button::Middle,event.time);
        file_creation_and_write(msg);
    }
    EventType::ButtonRelease(Button::Left)=>{
        let msg=format!("Button Released is {:?} at time {:?}\n",Button::Left,event.time);
        file_creation_and_write(msg);
    }
    EventType::ButtonRelease(Button::Right)=>{
        let msg=format!("Button Pressed is {:?} at time {:?}\n",Button::Right,event.time);
        file_creation_and_write(msg);
    }
    EventType::ButtonRelease(Button::Middle)=>{
         let msg=format!("Button Pressed is {:?} at time {:?}\n",Button::Middle,event.time);
         file_creation_and_write(msg);
    }
    EventType::MouseMove { x, y }=>{
        Counter_mouse_move.fetch_add(1,Ordering::SeqCst);
      let msg=format!("Mouse moved {} {}\n",x,y);
      file_creation_and_write(msg);
    }
    EventType::Wheel { delta_x, delta_y }=>{
        Counter_wheel.fetch_add(1,Ordering::SeqCst);
        let msg=format!("Wheel scrolled at {} {}\n",delta_x,delta_y);
        file_creation_and_write(msg);
    }
    _=>{
      
        let msg=String::from("Unknown key");
        file_creation_and_write(msg);
    }
}
     
} 

pub fn call_listener(){
    if let Err(error)=listen(callback){
    println!("Error is {:?}",error);
  }
}