import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog"
import "./App.css";

function App() {

  const [session, setsession] = useState(false);
  const [count, setcount] = useState({
    session_count: 0,
    key_count: 0,
    left_clicks: 0,
    right_clicks: 0,
    middle_clicks: 0,
    mouse_move: 0,
    wheel: 0
  })
  async function start_logging() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    const folder = await open({
      directory: true,
      multiple: false
    })
    if (!folder) {
      return
    }
    await invoke("start_logging", { folderPath: folder });
  }

  async function resume_event() {
    await invoke("resume_event");
  }

  async function pause_event() {
    await invoke("pause_event");
  }
  async function stop_event() {
    setsession(true)
    await invoke("stop_logging");
  }
  async function new_session() {
    setsession(false)
    const folder = await open(
      {
        directory: true,
        multiple: false
      }
    )

    if (!folder) {
      return
    }
    await invoke("new_session", { folderPath: folder });
  }

  async function showanalytics() {
    try {

      let data: any = await invoke("display_count");
      setcount({
        session_count: data.session_count,
        key_count:data.key_count ,
        left_clicks:data.left_clicks,
        right_clicks:data.right_clcks,
        middle_clicks: data.middle_clicks,
        mouse_move: data.mouse_move,
        wheel: data.wheel

      })
      console.log(data);
      console.dir(JSON.stringify(data, null, 2));

    } catch (err) {
      console.error("Error:", err);
    }


  }
  return (
    <div className="main">
      <h1>Welcome to EventTrace</h1>
      <div>start tracking</div>
      <button onClick={start_logging}>Start Logging</button>
      <button onClick={resume_event}>Resume</button>
      <button onClick={pause_event}>Pause</button>
      {session ? <button onClick={new_session}>Create New Session</button> : <button onClick={stop_event}>Stop</button>}
      <button onClick={showanalytics}>Analytics</button>
      <div>{`${count.session_count}`}
           {`${count.key_count}`}
           {`${count.left_clicks}`}
           {`${count.right_clicks}`}
           {`${count.middle_clicks}`}
           {`${count.mouse_move}`}
           {`${count.wheel}`}
      </div>
    </div>
  );
}

export default App;
