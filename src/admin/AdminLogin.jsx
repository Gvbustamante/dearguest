import { useState } from "react";
import { DiamondIcon } from "../components/icons.jsx";
import { supabase } from "../lib/supabase.js";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(
        signInError.message?.toLowerCase().includes("invalid")
          ? "Correo o contraseña incorrectos."
          : "No se pudo conectar. Revisa tu internet e intenta de nuevo."
      );
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <DiamondIcon className="admin-login-mark" />
        <h1>Dear Guest — Admin</h1>
        <p>Inicia sesión para gestionar clientes, mensajes y paquetes.</p>
        <div className="cf-field">
          <label htmlFor="admin-email">Correo</label>
          <input
            id="admin-email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="cf-field">
          <label htmlFor="admin-password">Contraseña</label>
          <input
            id="admin-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="admin-login-error">{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
