import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { App } from "./App";
import { DarkModeProvider } from "./contexts/DarkModeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </React.StrictMode>
  </BrowserRouter>
);
