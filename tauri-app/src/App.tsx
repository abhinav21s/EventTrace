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
  <div className="min-h-screen bg-slate-950 text-white px-10 py-8">

    {/* Header */}
    <div className="mb-10">
      <h1 className="text-5xl font-bold tracking-wide text-blue-400">
        EventTrace
      </h1>

      <p className="text-slate-400 mt-2 text-lg">
        Desktop Activity Logger
      </p>
    </div>

    <div className="grid lg:grid-cols-3 gap-8">

      {/* ================= Controls ================= */}

      <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-xl p-7">

        <h2 className="text-2xl font-semibold mb-6">
          Logging Controls
        </h2>

        <div className="flex flex-col gap-4">

          <button
            onClick={start_logging}
            className="flex items-center justify-center gap-3 rounded-xl bg-green-600 hover:bg-green-700 active:scale-95 transition-all py-3 font-semibold shadow-lg"
          >
            <Play size={20} />
            Start Logging
          </button>

          <button
            onClick={pause_event}
            className="flex items-center justify-center gap-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 active:scale-95 transition-all py-3 font-semibold shadow-lg"
          >
            <Pause size={20} />
            Pause Logging
          </button>

          <button
            onClick={resume_event}
            className="flex items-center justify-center gap-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all py-3 font-semibold shadow-lg"
          >
            <RotateCcw size={20} />
            Resume Logging
          </button>

          {session ? (
            <button
              onClick={new_session}
              className="flex items-center justify-center gap-3 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all py-3 font-semibold shadow-lg"
            >
              <FilePlus size={20} />
              New Session
            </button>
          ) : (
            <button
              onClick={stop_event}
              className="flex items-center justify-center gap-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 transition-all py-3 font-semibold shadow-lg"
            >
              <Square size={20} />
              Stop Logging
            </button>
          )}

          <button
            onClick={showanalytics}
            className="flex items-center justify-center gap-3 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 transition-all py-3 font-semibold shadow-lg"
          >
            <BarChart3 size={20} />
            Refresh Analytics
          </button>

        </div>

        <div className="mt-8 border-t border-slate-700 pt-5">

          <h3 className="font-semibold text-lg mb-3">
            Instructions
          </h3>

          <ul className="space-y-2 text-sm text-slate-400">
            <li>• Choose a folder before starting logging.</li>
            <li>• Pause and Resume whenever required.</li>
            <li>• Stop logging before creating a new session.</li>
            <li>• Click Refresh Analytics to update statistics.</li>
          </ul>

        </div>

      </div>

      {/* ================= Analytics ================= */}

      <div className="lg:col-span-2 bg-slate-900 border border-slate-700 rounded-3xl shadow-xl p-7">

        <div className="flex items-center gap-3 mb-7">
          <BarChart3 className="text-blue-400" size={28} />
          <h2 className="text-3xl font-semibold">
            Session Analytics
          </h2>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <p className="text-slate-400">Sessions</p>
            <p className="text-4xl font-bold mt-2">{count.session_count}</p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400">
              <Keyboard size={18} />
              Keyboard
            </div>
            <p className="text-4xl font-bold mt-2">{count.key_count}</p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400">
              <MousePointerClick size={18} />
              Left Clicks
            </div>
            <p className="text-4xl font-bold mt-2">{count.left_clicks}</p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400">
              <MousePointerClick size={18} />
              Right Clicks
            </div>
            <p className="text-4xl font-bold mt-2">{count.right_clicks}</p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400">
              <Mouse size={18} />
              Middle Clicks
            </div>
            <p className="text-4xl font-bold mt-2">{count.middle_clicks}</p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400">
              <Move size={18} />
              Mouse Movement
            </div>
            <p className="text-4xl font-bold mt-2">{count.mouse_move}</p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 md:col-span-2 xl:col-span-3">
            <div className="flex items-center gap-2 text-slate-400">
              <Mouse size={18} />
              Mouse Wheel Scroll
            </div>
            <p className="text-4xl font-bold mt-2">{count.wheel}</p>
          </div>

        </div>

      </div>

    </div>

  </div>
);
}

export default App;
