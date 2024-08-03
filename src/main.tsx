import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import WebApp from "@twa-dev/sdk";
import { ENVIRONMENTS } from "./constants/index.ts";

if (process.env.NODE_ENV === ENVIRONMENTS.DEV) {
  location.hash = "#tgWebAppVersion=7.8";
}
WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
