import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog"
import "./App.css";
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  FilePlus,
  BarChart3,
  Keyboard,
  MousePointerClick,
  Move,
  Mouse,
} from "lucide-react";


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
        right_clicks:data.right_clicks,
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
  <div className="min-h-screen bg-slate-900 text-white p-8">
    {/* Header */}
    <div className="mb-8 border-b border-slate-700 pb-4">
      <h1 className="text-4xl font-bold tracking-wide">EventTrace</h1>
      <p className="text-slate-400 mt-2">
        Desktop Activity Logger & Session Analytics
      </p>
    </div>

    <div className="grid grid-cols-2 gap-8">

      {/* Controls */}
      <div className="bg-slate-800 rounded-2xl shadow-xl p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Logging Controls
        </h2>

        <div className="grid gap-4">

          <button
            onClick={start_logging}
            className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 transition rounded-xl py-3 font-semibold"
          >
            <Play size={20} />
            Start Logging
          </button>

          <button
            onClick={pause_event}
            className="flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-600 transition rounded-xl py-3 font-semibold"
          >
            <Pause size={20} />
            Pause
          </button>

          <button
            onClick={resume_event}
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold"
          >
            <RotateCcw size={20} />
            Resume
          </button>

          {session ? (
            <button
              onClick={new_session}
              className="flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 transition rounded-xl py-3 font-semibold"
            >
              <FilePlus size={20} />
              New Session
            </button>
          ) : (
            <button
              onClick={stop_event}
              className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 transition rounded-xl py-3 font-semibold"
            >
              <Square size={20} />
              Stop Logging
            </button>
          )}

          <button
            onClick={showanalytics}
            className="flex items-center justify-center gap-3 bg-slate-700 hover:bg-slate-600 transition rounded-xl py-3 font-semibold"
          >
            <BarChart3 size={20} />
            Refresh Analytics
          </button>

        </div>
      </div>

      {/* Analytics */}
      <div className="bg-slate-800 rounded-2xl shadow-xl p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Session Analytics
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-slate-700 rounded-xl p-4">
            <p className="text-slate-400">Sessions</p>
            <p className="text-3xl font-bold">{count.session_count}</p>
          </div>

          <div className="bg-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Keyboard size={18} />
              Keyboard
            </div>
            <p className="text-3xl font-bold">{count.key_count}</p>
          </div>

          <div className="bg-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <MousePointerClick size={18} />
              Left Clicks
            </div>
            <p className="text-3xl font-bold">{count.left_clicks}</p>
          </div>

          <div className="bg-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <MousePointerClick size={18} />
              Right Clicks
            </div>
            <p className="text-3xl font-bold">{count.right_clicks}</p>
          </div>

          <div className="bg-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Mouse size={18} />
              Middle Clicks
            </div>
            <p className="text-3xl font-bold">{count.middle_clicks}</p>
          </div>

          <div className="bg-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Move size={18} />
              Mouse Moves
            </div>
            <p className="text-3xl font-bold">{count.mouse_move}</p>
          </div>

          <div className="bg-slate-700 rounded-xl p-4 col-span-2">
            <div className="flex items-center gap-2 text-slate-400">
              <Mouse size={18} />
              Scroll Wheel
            </div>
            <p className="text-3xl font-bold">{count.wheel}</p>
          </div>

        </div>

      </div>

    </div>
  </div>
);
}

export default App;
