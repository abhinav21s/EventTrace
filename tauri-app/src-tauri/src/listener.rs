use rdev::{Event,EventType,listen,Button};
use crate::logger::file_creation_and_write;
use std::sync::Mutex;
use std::sync::OnceLock;
#[derive(Debug)]
 enum Loggedstate{
   Paused,
   Logging
}
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
       let msg=format!("Key pressed is {:?} at time {:?}\n",key,event.time);
       file_creation_and_write(msg);
    }
    EventType::KeyRelease(key)=>{
        let msg=format!("Key released is {:?} at time {:?}\n",key,event.time);
        file_creation_and_write(msg);
    }
    EventType::ButtonPress(Button::Left)=>{
       let msg=format!("Button Pressed is {:?} at time {:?}\n",Button::Left,event.time);
       file_creation_and_write(msg);
    }
    EventType::ButtonPress(Button::Right)=>{
        let msg=format!("Button Pressed is {:?} at time {:?}\n",Button::Right,event.time);
        file_creation_and_write(msg);
    }
    EventType::ButtonPress(Button::Middle)=>{
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
      let msg=format!("Mouse moved {} {}\n",x,y);
      file_creation_and_write(msg);
    }
    EventType::Wheel { delta_x, delta_y }=>{
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