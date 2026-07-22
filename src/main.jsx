import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const container = document.getElementById("root");

if (!window.reactRoot) {
  window.reactRoot = ReactDOM.createRoot(container);
}

window.reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
