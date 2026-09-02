import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import AdminLogin from "./AdminLogin.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import "./admin.css";

export default function AdminApp() {
  const [session, setSession] = useState(undefined); // undefined = loading, null = logged out

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="admin-loading">
        <span>Cargando…</span>
      </div>
    );
  }

  return session ? <AdminDashboard /> : <AdminLogin />;
}
