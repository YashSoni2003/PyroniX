import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app.jsx";
import "./index.css";  // If you have any global styles
import { AuthProvider } from './store/auth.jsx';

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter>
    <AuthProvider>
      
      <App />
    </AuthProvider>
  </BrowserRouter>
);
