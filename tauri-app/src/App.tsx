import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import {open} from "@tauri-apps/plugin-dialog"
import "./App.css";

function App() {

  const [session,setsession]=useState(false);
  async function start_logging() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    const folder= await open({
      directory:true,
      multiple:false
    })
    if(!folder){
      return
    }
    await invoke("start_logging",{folderPath:folder} );
  }
  
  async function resume_event(){
    await invoke("resume_event");
  }

  async function pause_event(){
    await invoke("pause_event");
  }
  async function stop_event(){
    setsession(true)
    await invoke("stop_logging");
  }
  async function new_session(){
    setsession(false)
    const folder=await open(
      {
        directory:true,
        multiple:false
      }
    )

    if(!folder){
      return
    }
    await invoke("new_session",{folderPath:folder});
  }
  return (
    <div className="main">
      <h1>Welcome to EventTrace</h1>
      <div>start tracking</div>
      <button onClick={start_logging}>Start Logging</button>
      <button onClick={resume_event}>Resume</button>
      <button onClick={pause_event}>Pause</button>
     {session?<button onClick={new_session}>Create New Session</button>:<button onClick={stop_event}>Stop</button>}
    </div>
  );
}

export default App;
