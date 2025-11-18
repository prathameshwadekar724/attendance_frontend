import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import {AuthProvider} from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "flowbite/dist/flowbite.min.js"; // for Flowbite interactivity (dropdowns etc)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToastContainer position="top-right" autoClose={2000} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
