import { useState } from "react";
import AppTop from "../components/AppTop.jsx";
import { supabase } from "../lib/supabase.js";
import { syncToNotion } from "../lib/notion.js";

export default function PostEvento() {
  const [calificacion, setCalificacion] = useState("");
  const [autoriza, setAutoriza] = useState("");
  const [recomienda, setRecomienda] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.target);

    if (!calificacion || !autoriza || !recomienda) {
      setError("Por favor completa todas las preguntas.");
      return;
    }

    const record = {
      nombre: form.get("nombre")?.trim(),
      whatsapp: form.get("whatsapp")?.trim() || null,
      calificacion: Number(calificacion),
      testimonio: form.get("testimonio")?.trim(),
      autoriza_testimonio: autoriza === "Si",
      recomienda: recomienda === "Si",
    };

    setSending(true);
    const { data, error: dbError } = await supabase.rpc("dearguest_submit_post_evento", { p: record });
    setSending(false);

    if (dbError) {
      setError("No pudimos enviar tu testimonio. Intenta de nuevo.");
      return;
    }
    setSent(true);
    syncToNotion("post_evento", data);
  }

  if (sent) {
    return (
      <div className="app-page">
        <AppTop />
        <div className="card gracias-banner">
          <div className="emoji">💛</div>
          <div className="card-title" style={{ textAlign: "center" }}>
            ¡Gracias por compartir!
          </div>
          <p style={{ color: "var(--ink-soft)" }}>Tu opinión nos ayuda a seguir creando momentos eternos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <AppTop />
      <div className="card">
        <div className="card-title">Cuéntanos tu experiencia</div>
        <div className="card-sub">Tu opinión nos ayuda a seguir mejorando</div>
        <div className="divider" />
        {error && <div className="alert alert-error">⚠️ {error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Nombre</label>
            <input type="text" name="nombre" required />
          </div>
          <div className="field">
            <label>WhatsApp</label>
            <input type="tel" name="whatsapp" placeholder="+57 300 000 0000" />
          </div>
          <div className="field">
            <label>Calificación</label>
            <div className="pill-group">
              {[5, 4, 3, 2, 1].map((n) => (
                <label key={n} className={`pill-option${calificacion === String(n) ? " active" : ""}`}>
                  <input type="radio" checked={calificacion === String(n)} onChange={() => setCalificacion(String(n))} />
                  {"★".repeat(n)}
                </label>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Cuéntanos tu experiencia</label>
            <textarea name="testimonio" required />
          </div>
          <div className="field">
            <label>¿Autorizas usar tu testimonio en redes?</label>
            <div className="pill-group">
              <label className={`pill-option${autoriza === "Si" ? " active" : ""}`}>
                <input type="radio" checked={autoriza === "Si"} onChange={() => setAutoriza("Si")} />
                Sí, autorizo
              </label>
              <label className={`pill-option${autoriza === "No" ? " active" : ""}`}>
                <input type="radio" checked={autoriza === "No"} onChange={() => setAutoriza("No")} />
                No
              </label>
            </div>
          </div>
          <div className="field">
            <label>¿Recomendarías Dear Guest?</label>
            <div className="pill-group">
              <label className={`pill-option${recomienda === "Si" ? " active" : ""}`}>
                <input type="radio" checked={recomienda === "Si"} onChange={() => setRecomienda("Si")} />
                Sí, claro
              </label>
              <label className={`pill-option${recomienda === "No" ? " active" : ""}`}>
                <input type="radio" checked={recomienda === "No"} onChange={() => setRecomienda("No")} />
                No
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
            {sending ? "Enviando..." : "Enviar testimonio"}
          </button>
        </form>
      </div>
    </div>
  );
}
