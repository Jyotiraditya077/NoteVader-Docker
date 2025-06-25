import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthContext"; // ✅ import context

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ wrap App in context */}
        <App />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
