# Spring AI Email Assistant 🚀

## Project Summary

This project is a full-stack, AI-powered email assistant designed to automate email correspondence. It features a robust **Spring Boot backend** that leverages the Google Gemini API, a user-friendly **React web interface**, and a powerful **Chrome Extension** for seamless integration directly into the Gmail UI.

The primary goal was to build a production-ready application that solves a real-world problem, demonstrating expertise in backend architecture, frontend development, and third-party service integration.

---

## ✨ Key Features

* **🤖 AI-Powered Reply Generation:** Utilizes the Google Gemini API to generate intelligent, context-aware email replies.
* **🎨 Customizable Tone:** Allows users to select a specific tone (e.g., Professional, Casual) to tailor the AI's response.
* **📧 Seamless Gmail Integration:** A Chrome Extension injects an "AI Reply" button directly into the Gmail compose toolbar, making the feature feel native to the platform.
* **💻 Standalone Web Interface:** A separate React application provides an alternative method for generating email replies.
* **⚙️ Scalable RESTful API:** A well-defined Spring Boot backend serves as the central hub for both the web app and the browser extension.

---

## 🛠️ Tech Stack & Architecture

This project is composed of three main components that communicate via a central API.

#### Technologies Used
* **Backend:** Java 21, Spring Boot, Spring WebFlux (`WebClient`), Project Reactor, Maven
* **Frontend:** React, Vite, Axios, Material-UI
* **AI Service:** Google Gemini API
* **Browser Extension:** JavaScript (ES6+), HTML, CSS (Manifest V3)

#### System Architecture
The architecture is designed for decoupling and scalability. The Spring Boot application acts as the core service, handling all business logic and communication with the external Gemini API.

```mermaid
graph TD
    subgraph User Interfaces
        A[React Web App]
        B[Chrome Extension in Gmail]
    end

    subgraph Backend Service
        C[Spring Boot REST API]
    end

    subgraph External Services
        D[Google Gemini API]
    end

    A -->|HTTP Request| C
    B -->|HTTP Request| C
    C -->|API Call| D
    D -->|AI Response| C
    C -->|JSON Response| A
    C -->|JSON Response| B

    ---

## 🚀 Workflow & Setup

Follow these steps to get the project running locally. This allows for a complete end-to-end test of the system.

#### 1. Backend (Spring Boot API)
1.  **Clone the repository** and navigate to the `email-writer-sb` directory.
2.  **Configure API Keys:** Set the `GEMINI_URL` and `GEMINI_KEY` as environment variables in your IDE's run configuration.
3.  **Run the application** from the `EmailWriterSbApplication.java` main class. The server will start on `http://localhost:8080`.

#### 2. Frontend (React Web App)
1.  Navigate to the `email-writer-react` directory.
2.  Run `npm install` to install dependencies.
3.  Run `npm run dev` to start the development server.

#### 3. Chrome Extension
1.  Open Chrome and go to `chrome://extensions`.
2.  Enable **Developer Mode**.
3.  Click **"Load unpacked"** and select the `email-writer-extension` folder.

---

## 🎯 Challenges & Solutions

This section details key technical challenges encountered during development and the strategies used to overcome them.

#### **Challenge 1: Reliable UI Injection into a Dynamic Web App (Gmail)**
* **Problem:** Gmail is a Single-Page Application (SPA) that dynamically loads content without full page reloads. This made it difficult to reliably detect when the compose window was opened to inject the "AI Reply" button. Standard `DOMContentLoaded` events were insufficient.
* **Solution:** I implemented a **`MutationObserver`** in the Chrome extension's content script. This observer efficiently watches the DOM for specific changes (like the addition of nodes matching Gmail's compose window selectors). This approach allowed for a robust and performant way to trigger the button injection precisely when needed, without slowing down the user's experience.

#### **Challenge 2: Handling Asynchronous Operations**
* **Problem:** The backend needs to make a network call to the external Gemini API, which is an asynchronous and potentially long-running operation. Blocking the main thread would lead to poor performance and scalability.
* **Solution:** I utilized Spring WebFlux's **`WebClient`**, a non-blocking, reactive HTTP client. This allowed the application to handle the API call asynchronously, freeing up server threads to manage other incoming requests. The entire process, from receiving the request to returning the AI-generated response, is handled reactively.

---

## 🎓 Key Learnings & Takeaways

* **Full-Stack Integration:** Gained significant experience in designing and integrating a complete system, from a browser extension to a reactive backend and a modern frontend.
* **DOM Manipulation & Browser APIs:** Developed a deep understanding of browser extension architecture (Manifest V3) and advanced DOM manipulation techniques using `MutationObserver`.
* **Reactive Programming:** Acquired practical skills in reactive programming with Project Reactor and `WebClient`, learning how to build more resilient and efficient non-blocking applications.
* **Problem Solving:** Learned to debug and reverse-engineer parts of a complex, third-party web application (Gmail) to achieve seamless integration.

---

## ✅ Results & Impact

The final result is a fully functional, real-world application that effectively automates email replies.

* **Proof of Concept:** Successfully demonstrates the power of integrating Generative AI into everyday tools to boost productivity.
* **Portfolio Piece:** Serves as a comprehensive showcase of skills across the full software development lifecycle, from architecture design to deployment and documentation.