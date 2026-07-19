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

  return (
    <div className="main">
      <h1>Welcome to EventTrace</h1>
      <div>start tracking</div>
      <button onClick={start_logging}>Start Logging</button>
    </div>
  );
}

export default App;
