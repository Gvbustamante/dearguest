import { useState } from "react";
import { DiamondIcon } from "../components/icons.jsx";
import { supabase } from "../lib/supabase.js";
import AdminClients from "./AdminClients.jsx";
import AdminMessages from "./AdminMessages.jsx";
import AdminPlans from "./AdminPlans.jsx";

const TABS = [
  { id: "clients", label: "Clientes" },
  { id: "messages", label: "Mensajes" },
  { id: "plans", label: "Paquetes" },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState("clients");

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="admin-brand">
          <DiamondIcon className="brand-mark" />
          <span className="brand-name">Dear Guest — Admin</span>
        </div>
        <button className="btn btn-ghost admin-logout" type="button" onClick={() => supabase.auth.signOut()}>
          Cerrar sesión
        </button>
      </header>

      <nav className="admin-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`admin-tab${tab === t.id ? " active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="admin-main">
        {tab === "clients" && <AdminClients />}
        {tab === "messages" && <AdminMessages />}
        {tab === "plans" && <AdminPlans />}
      </main>
    </div>
  );
}
