import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog"
import "./App.css";
import "./index.css";
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
  Activity,
  ScrollText,
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
  <div className="min-h-screen bg-[#0b0d12] text-slate-200 antialiased selection:bg-sky-500/20">
    {/* very subtle, calm top ambiance */}
    <div className="pointer-events-none fixed inset-x-0 top-0 h-48 bg-gradient-to-b from-white/[0.03] to-transparent" />

    <div className="relative mx-auto max-w-6xl px-6 py-10 md:px-10">

      {/* ================= Header ================= */}
      <header className="mb-9 flex flex-col gap-5 border-b border-white/[0.06] pb-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-inset ring-white/10">
            <Activity className="text-sky-400/90" size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              EventTrace
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              Desktop Activity Logger
            </p>
          </div>
        </div>

        {/* status pill (reflects existing session state) */}
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-sm font-medium sm:self-auto">
          <span
            className={`h-2 w-2 rounded-full ${
              session ? "bg-slate-600" : "bg-emerald-400/90"
            }`}
          />
          <span className={session ? "text-slate-400" : "text-slate-300"}>
            {session ? "Session stopped" : "Ready to log"}
          </span>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-3">

        {/* ================= Controls ================= */}
        <section className="rounded-2xl border border-white/[0.07] bg-[#12151c] p-6 shadow-xl shadow-black/30">

          <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Logging Controls
          </h2>

          <div className="flex flex-col gap-2.5">

            <button
              onClick={start_logging}
              title="Choose a folder and begin recording activity"
              className="group flex items-center gap-3 rounded-lg bg-emerald-600/90 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12151c] active:bg-emerald-700"
            >
              <Play size={17} className="shrink-0" />
              Start Logging
            </button>

            {/* pause / resume pair */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={pause_event}
                title="Temporarily stop recording"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12151c] active:bg-white/[0.08]"
              >
                <Pause size={16} className="shrink-0" />
                Pause
              </button>

              <button
                onClick={resume_event}
                title="Continue recording after a pause"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12151c] active:bg-white/[0.08]"
              >
                <RotateCcw size={16} className="shrink-0" />
                Resume
              </button>
            </div>

            {session ? (
              <button
                onClick={new_session}
                title="Start a fresh session in a new folder"
                className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/[0.05] hover:text-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12151c] active:bg-white/[0.08]"
              >
                <FilePlus size={17} className="shrink-0" />
                New Session
              </button>
            ) : (
              <button
                onClick={stop_event}
                title="Stop recording and close the current session"
                className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/[0.06] px-4 py-2.5 text-sm font-medium text-red-300/90 transition-colors hover:bg-red-500/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12151c] active:bg-red-500/[0.16]"
              >
                <Square size={17} className="shrink-0" />
                Stop Logging
              </button>
            )}

            <div className="my-1.5 h-px bg-white/[0.06]" />

            <button
              onClick={showanalytics}
              title="Reload the latest statistics"
              className="flex items-center gap-3 rounded-lg border border-sky-500/20 bg-sky-500/[0.06] px-4 py-2.5 text-sm font-medium text-sky-200/90 transition-colors hover:bg-sky-500/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12151c] active:bg-sky-500/[0.16]"
            >
              <BarChart3 size={17} className="shrink-0" />
              Refresh Analytics
            </button>

          </div>

          <div className="mt-7 rounded-xl border border-white/[0.05] bg-black/20 p-4">
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              Instructions
            </h3>
            <ul className="space-y-2.5 text-[13px] leading-relaxed text-slate-400">
              <li className="flex gap-2.5">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                Choose a folder before starting logging.
              </li>
              <li className="flex gap-2.5">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                Pause and Resume whenever required.
              </li>
              <li className="flex gap-2.5">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                Stop logging before creating a new session.
              </li>
              <li className="flex gap-2.5">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                Click Refresh Analytics to update statistics.
              </li>
            </ul>
          </div>

        </section>

        {/* ================= Analytics ================= */}
        <section className="rounded-2xl border border-white/[0.07] bg-[#12151c] p-6 shadow-xl shadow-black/30 lg:col-span-2">

          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-inset ring-white/10">
                <BarChart3 className="text-sky-400/90" size={17} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-100">Session Analytics</h2>
                <p className="text-xs text-slate-500">Activity breakdown</p>
              </div>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5 text-xs font-medium sm:inline-flex">
              <span className="text-slate-500">Total events</span>
              <span className="tabular-nums text-slate-200">
                {(
                  count.key_count +
                  count.left_clicks +
                  count.right_clicks +
                  count.middle_clicks +
                  count.mouse_move +
                  count.wheel
                ).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-slate-400">
                <Activity size={15} className="text-violet-400/80" />
                <span className="text-[11px] font-medium uppercase tracking-[0.1em]">Sessions</span>
              </div>
              <p className={`mt-2.5 text-2xl font-semibold tabular-nums ${count.session_count ? "text-slate-50" : "text-slate-600"}`}>{count.session_count.toLocaleString()}</p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-slate-400">
                <Keyboard size={15} className="text-sky-400/80" />
                <span className="text-[11px] font-medium uppercase tracking-[0.1em]">Keyboard</span>
              </div>
              <p className={`mt-2.5 text-2xl font-semibold tabular-nums ${count.key_count ? "text-slate-50" : "text-slate-600"}`}>{count.key_count.toLocaleString()}</p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-slate-400">
                <MousePointerClick size={15} className="text-emerald-400/80" />
                <span className="text-[11px] font-medium uppercase tracking-[0.1em]">Left Clicks</span>
              </div>
              <p className={`mt-2.5 text-2xl font-semibold tabular-nums ${count.left_clicks ? "text-slate-50" : "text-slate-600"}`}>{count.left_clicks.toLocaleString()}</p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-slate-400">
                <MousePointerClick size={15} className="text-emerald-400/80" />
                <span className="text-[11px] font-medium uppercase tracking-[0.1em]">Right Clicks</span>
              </div>
              <p className={`mt-2.5 text-2xl font-semibold tabular-nums ${count.right_clicks ? "text-slate-50" : "text-slate-600"}`}>{count.right_clicks.toLocaleString()}</p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-slate-400">
                <Mouse size={15} className="text-emerald-400/80" />
                <span className="text-[11px] font-medium uppercase tracking-[0.1em]">Middle Clicks</span>
              </div>
              <p className={`mt-2.5 text-2xl font-semibold tabular-nums ${count.middle_clicks ? "text-slate-50" : "text-slate-600"}`}>{count.middle_clicks.toLocaleString()}</p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-slate-400">
                <Move size={15} className="text-amber-400/80" />
                <span className="text-[11px] font-medium uppercase tracking-[0.1em]">Mouse Movement</span>
              </div>
              <p className={`mt-2.5 text-2xl font-semibold tabular-nums ${count.mouse_move ? "text-slate-50" : "text-slate-600"}`}>{count.mouse_move.toLocaleString()}</p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.03] sm:col-span-2 xl:col-span-3">
              <div className="flex items-center gap-2 text-slate-400">
                <ScrollText size={15} className="text-rose-400/80" />
                <span className="text-[11px] font-medium uppercase tracking-[0.1em]">Mouse Wheel Scroll</span>
              </div>
              <p className={`mt-2.5 text-2xl font-semibold tabular-nums ${count.wheel ? "text-slate-50" : "text-slate-600"}`}>{count.wheel.toLocaleString()}</p>
            </div>

          </div>

        </section>

      </div>

      {/* ================= Footer ================= */}
      <footer className="mt-10 flex items-center justify-between border-t border-white/[0.06] pt-5 text-xs text-slate-600">
        <span>EventTrace</span>
        <span>Desktop Activity Logger</span>
      </footer>

    </div>
  </div>
);
}

export default App;
