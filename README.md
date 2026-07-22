# EventTrace

EventTrace is a cross-platform desktop application built with **Rust**, **Tauri**, and **React** that captures global keyboard and mouse activity and stores it as structured, timestamped CSV datasets.

Designed with performance, modularity, and extensibility in mind, EventTrace enables developers and researchers to collect high-quality interaction data for behavioral analytics, Human-Computer Interaction (HCI), and Machine Learning applications.

---

## Features

### Event Logging

- Global keyboard event tracking
- Global mouse event tracking
- Timestamped event recording
- Automatic CSV generation
- One log file per session
- High-performance Rust backend

### Session Management

- Start logging
- Pause logging
- Resume logging
- Stop logging
- Create a new logging session
- Multiple independent session logs

### Analytics

- Session statistics
- Keyboard event count
- Mouse click count
- Mouse movement count
- Scroll wheel count
- Live session analytics

### Desktop Features

- Native desktop application
- System tray support
- Hide to tray
- Restore window from tray
- Lightweight memory usage
- Cross-platform architecture

---
## Applications

EventTrace generates structured interaction datasets that can support:

- Human-Computer Interaction (HCI) research
- User behavior analysis
- Productivity and workflow studies
- Academic research
- Desktop interaction analytics
- Machine learning dataset preparation
- Sequential event analysis
- Research on intelligent user interfaces

The generated CSV logs can be further processed into datasets for machine learning models, behavioral analysis, or visualization pipelines.

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite

### Backend

- Rust
- Tauri

### Rust Crates

- rdev
- chrono
- serde
- tauri
- tauri-plugin-opener

---

## Installation

### Prerequisites

Install the following before running the project:

- Rust
- Cargo
- Node.js (LTS)
- npm

### Windows Requirements

- Visual Studio Build Tools
- Desktop Development with C++
- Windows SDK

Clone the repository:

```bash
git clone https://github.com/<username>/EventTrace.git
```

Navigate into the project:

```bash
cd EventTrace
```

Install dependencies:

```bash
npm install
```

---

## Running the Application

Start the development version:

```bash
npm run tauri dev
```

This launches:

- React development server
- Rust backend
- Native Tauri desktop application

---

## Building for Production

Create a production build:

```bash
npm run tauri build
```

The compiled executable will be available in the Tauri build directory.

---

## How EventTrace Works

1. User starts a logging session.
2. A timestamped CSV file is created.
3. Global keyboard and mouse events are captured.
4. Events are written to the CSV file in real time.
5. Users can pause, resume, stop, or create a new session.
6. Session analytics are continuously updated.
7. The generated datasets can be exported for further analysis or machine learning.

---

## Generated Dataset

Each event records information such as:

- Timestamp
- Event type
- Keyboard input
- Mouse button events
- Mouse movement
- Scroll events

The datasets are suitable for preprocessing pipelines used in analytics and machine learning workflows.

---

## Current Functionality

- Global event listener
- CSV logging
- Multiple logging sessions
- Pause / Resume logging
- Stop logging
- Live analytics
- System tray integration
- Native desktop interface

---

## Future Roadmap

Planned improvements include:

- Privacy mode (skip password fields)
- Configurable logging filters
- JSON and Parquet export
- Built-in analytics dashboard
- Dataset preprocessing utilities
- Application-specific logging
---

## Ethical Use

EventTrace is intended **only** for use on systems that you own or where you have explicit permission to collect interaction data.

Users are responsible for ensuring compliance with applicable privacy laws, organizational policies, and ethical data collection practices.

---


## License

This project is licensed under the MIT License.

---

## Acknowledgements

- Rust
- Tauri
- React
- Vite
- rdev
- Chrono
- Serde