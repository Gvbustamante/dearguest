import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { DiamondIcon } from "../components/icons.jsx";
import { supabase } from "../lib/supabase.js";
import { useAuth } from "../lib/useAuth.js";

export default function AdminLogin() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  if (!loading && session) return <Navigate to="/admin" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSending(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setSending(false);
    if (authError) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    navigate("/admin");
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="app-top" style={{ justifyContent: "center", border: "none", marginBottom: 24 }}>
          <span className="brand">
            <DiamondIcon className="brand-mark" />
            <span className="brand-name">Dear Guest</span>
          </span>
        </div>
        <div className="card">
          <div className="card-title">Panel Admin</div>
          <div className="card-sub">Ingresa tu correo y contraseña para continuar</div>
          <div className="divider" />
          {error && <div className="alert alert-error">⚠️ {error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Correo</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
            </div>
            <div className="field">
              <label>Contraseña</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
              {sending ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
