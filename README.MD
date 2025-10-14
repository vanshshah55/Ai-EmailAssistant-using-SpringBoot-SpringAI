# AI Email Assistant using SPRINBOOT & SPRING AI 🚀

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

## 📸 Results
![result](https://github.com/vanshshah55/Ai-EmailAssistant-using-SpringBoot-SpringAI/blob/main/React%20frontend%20result.png)
![result](https://github.com/vanshshah55/Ai-EmailAssistant-using-SpringBoot-SpringAI/blob/646472c0ecaece180eb741b96f7be1c9b3ac5364/Chrome%20extension%20video.mp4)
---

## 🛠️ Tech Stack

This project is composed of three main components that communicate via a central API.

#### Technologies Used
* **Backend:** Java 21, Spring Boot, Spring WebFlux (`WebClient`), Project Reactor, Maven
* **Frontend:** React, Vite, Axios, Material-UI
* **AI Service:** Google Gemini API
* **Browser Extension:** JavaScript (ES6+), HTML, CSS (Manifest V3)

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

## 🎓 Key Learnings & Takeaways

* **Full-Stack Integration:** Gained significant experience in designing and integrating a complete system, from a browser extension to a reactive backend and a modern frontend.
* **Reactive Programming:** Acquired practical skills in reactive programming with Project Reactor and `WebClient`, learning how to build more resilient and efficient non-blocking applications.
* **Problem Solving:** Learned to debug and reverse-engineer parts of a complex, third-party web application (Gmail) to achieve seamless integration.

---
