import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.css";
import App from "./App";
import "@picocss/pico/css/pico.min.css";

import "./index.css";
import { AuthProvider } from "./AuthContext";
import { ApiProvider } from "./ApiContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </AuthProvider>
  </React.StrictMode>
);
