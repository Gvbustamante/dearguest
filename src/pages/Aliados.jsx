import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppTop from "../components/AppTop.jsx";
import { supabase } from "../lib/supabase.js";
import { syncToNotion } from "../lib/notion.js";

const TIPOS = ["Wedding/Event Planner", "Fotógrafo/Videógrafo", "DJ/Música", "Salón de eventos", "Decoración", "Otro"];

export default function Aliados() {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(null); // { codigo }
  const [error, setError] = useState("");
  const [loginCodigo, setLoginCodigo] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.target);
    const nombre = form.get("nombre")?.trim();
    const whatsapp = form.get("whatsapp")?.trim();
    if (!nombre || !whatsapp) {
      setError("Nombre y WhatsApp son obligatorios.");
      return;
    }

    setSending(true);
    const { data, error: rpcError } = await supabase.rpc("dearguest_register_aliado", {
      p_nombre: nombre,
      p_empresa: form.get("empresa")?.trim() || null,
      p_whatsapp: whatsapp,
      p_ciudad: form.get("ciudad")?.trim() || null,
      p_tipo: form.get("tipo") || null,
    });
    setSending(false);

    if (rpcError || !data?.codigo) {
      setError("No pudimos registrar tu alianza. Intenta de nuevo.");
      return;
    }
    setSent({ codigo: data.codigo });
    syncToNotion("aliados", {
      nombre,
      empresa: form.get("empresa")?.trim(),
      whatsapp,
      ciudad: form.get("ciudad")?.trim(),
      tipo: form.get("tipo"),
      codigo: data.codigo,
      comision: 10,
    });
  }

  if (sent) {
    return (
      <div className="app-page">
        <AppTop />
        <div className="card" style={{ textAlign: "center", padding: "44px 28px" }}>
          <div style={{ fontSize: "3rem", marginBottom: 14 }}>💎</div>
          <div className="card-title" style={{ textAlign: "center" }}>
            ¡Solicitud recibida!
          </div>
          <p style={{ color: "var(--ink-soft)", fontSize: ".9rem", marginTop: 8 }}>
            Te contactaremos por WhatsApp en las próximas 24 horas para activar tu alianza.
          </p>
          <div className="alert alert-ok" style={{ marginTop: 20, justifyContent: "center" }}>
            Tu código: <span className="ref-code">{sent.codigo}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <AppTop />

      <div className="card" style={{ background: "linear-gradient(135deg,var(--wine-soft) 0%,var(--paper) 60%)" }}>
        <div className="eyebrow">Programa de alianzas</div>
        <div className="card-title" style={{ marginTop: 10 }}>
          Gana dinero refiriendo quinceañeras
        </div>
        <p style={{ color: "var(--ink-soft)", fontSize: ".9rem" }}>
          Comparte tu link, cada cliente que cierre te genera comisión automática.
        </p>
        <div className="stats-grid" style={{ marginTop: 16 }}>
          <div className="stat-card">
            <div className="stat-n">10%</div>
            <div className="stat-l">Comisión base</div>
          </div>
          <div className="stat-card">
            <div className="stat-n">Link</div>
            <div className="stat-l">Personal único</div>
          </div>
          <div className="stat-card">
            <div className="stat-n">$0</div>
            <div className="stat-l">Costo de unirse</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Solicitar alianza</div>
        <div className="card-sub">Completa el formulario — te respondemos en 24h</div>
        <div className="divider" />
        {error && <div className="alert alert-error">⚠️ {error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Nombre completo *</label>
            <input type="text" name="nombre" required />
          </div>
          <div className="field">
            <label>Nombre de tu negocio</label>
            <input type="text" name="empresa" placeholder="Ej: Eventos Glamour" />
          </div>
          <div className="field-row">
            <div className="field">
              <label>WhatsApp *</label>
              <input type="tel" name="whatsapp" required placeholder="+57 300 000 0000" />
            </div>
            <div className="field">
              <label>Ciudad</label>
              <input type="text" name="ciudad" />
            </div>
          </div>
          <div className="field">
            <label>¿Qué tipo de aliado eres?</label>
            <select name="tipo">
              <option value="">Selecciona...</option>
              {TIPOS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
            {sending ? "Enviando..." : "Solicitar alianza →"}
          </button>
        </form>
      </div>

      <div className="card card--sm">
        <div style={{ fontWeight: 700, fontSize: ".95rem" }}>¿Ya eres aliado?</div>
        <div style={{ fontSize: ".82rem", color: "var(--ink-soft)" }}>Accede con tu código personal</div>
        <div className="divider" style={{ marginTop: 14 }} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (loginCodigo.trim()) navigate(`/aliados/dashboard?codigo=${encodeURIComponent(loginCodigo.trim())}`);
          }}
          style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
        >
          <input
            type="text"
            placeholder="Tu código (ej: ANDY1234)"
            value={loginCodigo}
            onChange={(e) => setLoginCodigo(e.target.value)}
            style={{ flex: 1, minWidth: 180 }}
          />
          <button type="submit" className="btn btn-primary">
            Entrar al dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
