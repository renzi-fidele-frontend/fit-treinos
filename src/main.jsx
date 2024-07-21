import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);
