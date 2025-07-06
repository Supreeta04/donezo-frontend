# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# DoneZo – Your Productivity Partner 🚀

This is the frontend for DoneZo – a full-stack task management app built with React, Firebase, and Node.js.

## 🔗 Live Demo
👉 [Frontend on Vercel](https://donezo-frontend.vercel.app)  
👉 [Backend on Render](https://donezo-backend-8fiu.onrender.com)

## 📷 Loom Demo
👉 [Watch Demo Video](https://www.loom.com/share/167bb354a760444caef05e6a75fa4a4b?sid=52670392-5cb5-42d3-a5bc-33eec17c6a07)

## 🛠️ Tech Stack
- React.js
- Firebase Authentication (Google Login)
- Axios (for API)
-  CSS
- Node.js

## 📌 Architecture Diagram
                         ┌──────────────────────────────┐
                         │      DoneZo Task App         │
                         │    (Full Stack Project)      │
                         └────────────┬─────────────────┘
                                      │
             ┌────────────────────────┼────────────────────────┐
             │                        │                        │
     ┌───────▼────────┐      ┌────────▼────────┐      ┌────────▼────────┐
     │   Frontend     │      │   Backend       │      │   Database      │
     │ (React + Vite) │      │ (Node + Express)│      │  (MongoDB Atlas)│
     └───────┬────────┘      └───────┬──────────┘      └────────┬───────┘
             │                        │                         │
             │                        │                         │
   ┌─────────▼──────────┐   ┌─────────▼─────────┐     ┌─────────▼─────────┐
   │ Google Auth (OAuth)│   │ REST APIs (CRUD)  │     │ Tasks Collection  │
   │   via Firebase     │   │ Task Routes       │     │ Users Collection  │
   └────────────────────┘   └───────────────────┘     └───────────────────┘



---

📢 _This project is a part of a hackathon run by [Katomaran](https://www.katomaran.com)_

