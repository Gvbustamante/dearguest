import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminApp from "./admin/AdminApp.jsx";
import AlliesPage from "./components/AlliesPage.jsx";

const path = window.location.pathname;
const page = path.startsWith("/admin") ? "admin" : path.startsWith("/alianzas") ? "alianzas" : "home";

const routes = { admin: <AdminApp />, alianzas: <AlliesPage />, home: <App /> };

createRoot(document.getElementById("root")).render(<StrictMode>{routes[page]}</StrictMode>);
