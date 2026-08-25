import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./app.css";
import App from "./App.jsx";
import Cotizar from "./pages/Cotizar.jsx";
import Personalizacion from "./pages/Personalizacion.jsx";
import PostEvento from "./pages/PostEvento.jsx";
import Aliados from "./pages/Aliados.jsx";
import AliadoDashboard from "./pages/AliadoDashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import Admin from "./pages/Admin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cotizar" element={<Cotizar />} />
        <Route path="/personalizacion" element={<Personalizacion />} />
        <Route path="/post-evento" element={<PostEvento />} />
        <Route path="/aliados" element={<Aliados />} />
        <Route path="/aliados/dashboard" element={<AliadoDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
