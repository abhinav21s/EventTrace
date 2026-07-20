# EventTrace

EventTrace is a cross-platform desktop application built with **Rust**, **Tauri**, and **React** that captures global keyboard and mouse interactions and stores them in structured, timestamped CSV files.

The primary goal of this project is to generate high-quality behavioral datasets that can be used for:

* Machine Learning research
* Behavioral analysis
* Human-Computer Interaction (HCI) studies
* User activity analytics
* Training intelligent software agents
* Studying interaction patterns for autonomous and agentic AI systems

EventTrace serves as both a systems programming project and a data collection platform for researchers and developers interested in understanding how users interact with computers.

> **Ethical Use Notice:** EventTrace is intended only for use on systems you own or where you have explicit permission to collect interaction data. Any datasets collected should comply with applicable privacy laws and organizational policies.

---

# Features

* Global keyboard event logging
* Global mouse event logging
* Timestamped CSV log generation
* One log file per application session
* Native desktop application using Tauri
* React-powered user interface
* Modular Rust backend
* Cross-platform architecture (Windows, Linux, and macOS)

---

# Why EventTrace?

Modern AI systems increasingly benefit from learning how humans interact with software and operating systems.

EventTrace provides a lightweight framework for collecting interaction data that can later be transformed into datasets for:

* Sequence modeling
* User behavior prediction
* Intelligent automation
* Reinforcement learning environments
* Agentic AI training pipelines
* Human-in-the-loop learning
* Productivity pattern analysis
* Workflow optimization

The generated logs can be further processed into features suitable for training machine learning models such as Transformers, RNNs, LSTMs, Temporal CNNs, Hidden Markov Models, or reinforcement learning agents.

---

# Technology Stack

## Frontend

* React
* JavaScript
* Vite

## Backend

* Rust
* Tauri

## Rust Crates

* rdev
* chrono
* tauri
* tauri-plugin-opener

---

# Project Structure

```text
EventTrace/
│
├── src/                    # React frontend
│
├── src-tauri/
│   ├── src/
│   │   ├── main.rs
│   │   ├── lib.rs
│   │   ├── listener.rs
│   │   └── logger.rs
│   │
│   ├── Cargo.toml
│   └── Cargo.lock
│
├── package.json
├── package-lock.json
└── README.md
```

---

# Installation

## Prerequisites

Install:

* Node.js (LTS recommended)
* npm
* Rust
* Cargo

For Windows also install:

* Visual Studio Build Tools
* Desktop Development with C++
* Windows SDK

---

Clone the repository:

```bash
git clone https://github.com/<your-username>/EventTrace.git
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

# Running the Application

Launch the desktop application in development mode:

```bash
npm run tauri dev
```

This starts:

* React development server
* Rust backend
* Native Tauri desktop application

---

# Production Build

Build the application:

```bash
npm run tauri build
```

The compiled executable will be generated in the Tauri build output directory.

---

# How It Works

1. The application starts.
2. A timestamped CSV file is created for the session.
3. Global keyboard and mouse events are captured.
4. Events are written to the session log.
5. The generated dataset can later be cleaned, transformed, and used for behavioral analysis or machine learning workflows.

---

# Potential Machine Learning Applications

The collected interaction data can be engineered into datasets for:

* User behavior modeling
* Intent prediction
* Workflow recommendation systems
* Productivity analytics
* Human-computer interaction research
* Digital ergonomics studies
* Intelligent desktop assistants
* Agentic AI systems that learn user workflows
* Personalized automation
* Sequential decision-making models

Future versions may include preprocessing pipelines to convert raw event logs into feature-rich datasets suitable for model training.

---

# Future Roadmap

* System tray support
* Pause/Resume logging -- implemented
* Start/Stop logging
* Event visualization dashboard
* Log search and filtering
* Dataset preprocessing utilities
* Export to CSV, JSON, and Parquet
* Session analytics
* User-configurable logging filters
* Privacy controls and anonymization options
* Plugin architecture for custom event processors

---

# License

This project is licensed under the MIT License.

---

# Acknowledgements

* Rust
* Tauri
* React
* rdev
* Chrono
