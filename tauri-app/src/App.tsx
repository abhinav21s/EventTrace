import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import {open} from "@tauri-apps/plugin-dialog"
import "./App.css";

function App() {

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
  return (
    <div className="main">
      <h1>Welcome to EventTrace</h1>
      <div>start tracking</div>
      <button onClick={start_logging}>Start Logging</button>
      <button onClick={resume_event}>Resume</button>
      <button onClick={pause_event}>Pause</button>
    </div>
  );
}

export default App;
