import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppTop from "../components/AppTop.jsx";
import { supabase } from "../lib/supabase.js";
import { syncToNotion } from "../lib/notion.js";
import { plans } from "../data/content.js";

const FUENTES = ["Instagram", "TikTok", "Referido", "WhatsApp directo", "Otra"];

export default function Cotizar() {
  const [params] = useSearchParams();
  const codigoAliado = (params.get("ref") || "").toUpperCase();

  const [tipo, setTipo] = useState("cotizacion");
  const [paquete, setPaquete] = useState(params.get("paquete") || "");
  const [fuente, setFuente] = useState("");
  const [aliadoNombre, setAliadoNombre] = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!codigoAliado) return;
    supabase
      .rpc("dearguest_check_aliado_codigo", { p_codigo: codigoAliado })
      .then(({ data }) => {
        if (data?.valid) setAliadoNombre(data.nombre);
      });
  }, [codigoAliado]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.target);

    const record = {
      tipo,
      nombre: form.get("nombre")?.trim(),
      whatsapp: form.get("whatsapp")?.trim(),
      ciudad: form.get("ciudad")?.trim() || null,
      nombre_quinceanera: tipo === "cotizacion" ? form.get("nombre_quinceanera")?.trim() : null,
      fecha_evento: tipo === "cotizacion" ? form.get("fecha_evento") || null : null,
      tematica: tipo === "cotizacion" ? form.get("tematica")?.trim() || null : null,
      paquete: tipo === "cotizacion" ? paquete || null : null,
      fuente: tipo === "cotizacion" ? fuente || null : null,
      mensaje: tipo === "soporte" ? form.get("mensaje")?.trim() : null,
      codigo_aliado: tipo === "cotizacion" && codigoAliado ? codigoAliado : null,
    };

    if (!record.nombre || !record.whatsapp) {
      setError("Nombre y WhatsApp son obligatorios.");
      return;
    }
    if (tipo === "cotizacion" && !record.nombre_quinceanera) {
      setError("Falta el nombre de la quinceañera.");
      return;
    }
    if (tipo === "soporte" && !record.mensaje) {
      setError("Cuéntanos tu mensaje.");
      return;
    }

    setSending(true);
    const { data, error: dbError } = await supabase.rpc("dearguest_submit_lead", { p: record });
    setSending(false);

    if (dbError) {
      setError("No pudimos enviar tu formulario. Intenta de nuevo o escríbenos por WhatsApp.");
      return;
    }
    setSent(true);
    syncToNotion("leads", data);
  }

  if (sent) {
    return (
      <div className="app-page">
        <AppTop />
        <div className="card gracias-banner">
          <div className="emoji">🎉</div>
          <div className="card-title" style={{ textAlign: "center" }}>
            ¡Recibido!
          </div>
          <p style={{ color: "var(--ink-soft)" }}>
            {tipo === "cotizacion"
              ? "En minutos te escribimos por WhatsApp para contarte todo sobre tu paquete."
              : "Te respondemos muy pronto por WhatsApp."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <AppTop />
      <div className="card">
        <div className="card-title">Cuéntanos qué necesitas</div>
        <div className="card-sub">Cotiza tu paquete o escríbenos si tienes dudas — un solo formulario, así de simple.</div>
        <div className="divider" />

        {aliadoNombre && (
          <div className="alert alert-ok">💎 Referido por un aliado Dear Guest — código {codigoAliado}</div>
        )}
        {error && <div className="alert alert-error">⚠️ {error}</div>}

        <div className="pill-group" style={{ marginBottom: 22 }}>
          <label className={`pill-option${tipo === "cotizacion" ? " active" : ""}`}>
            <input type="radio" checked={tipo === "cotizacion"} onChange={() => setTipo("cotizacion")} />
            💬 Quiero cotizar
          </label>
          <label className={`pill-option${tipo === "soporte" ? " active" : ""}`}>
            <input type="radio" checked={tipo === "soporte"} onChange={() => setTipo("soporte")} />
            🛟 Necesito soporte
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field-row">
            <div className="field">
              <label>Tu nombre</label>
              <input type="text" name="nombre" required />
            </div>
            <div className="field">
              <label>WhatsApp</label>
              <input type="tel" name="whatsapp" placeholder="+57 300 000 0000" required />
            </div>
          </div>
          <div className="field">
            <label>Ciudad</label>
            <input type="text" name="ciudad" />
          </div>

          {tipo === "cotizacion" ? (
            <>
              <div className="field">
                <label>Nombre de la quinceañera</label>
                <input type="text" name="nombre_quinceanera" required />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Fecha del evento (opcional)</label>
                  <input type="date" name="fecha_evento" />
                </div>
                <div className="field">
                  <label>Temática (opcional)</label>
                  <input type="text" name="tematica" placeholder="Ej: Acuático, Bosque..." />
                </div>
              </div>
              <div className="field">
                <label>Paquete de interés</label>
                <div className="pill-group">
                  {plans.map((p) => (
                    <label key={p.id} className={`pill-option${paquete === p.name ? " active" : ""}`}>
                      <input
                        type="radio"
                        name="paquete_ui"
                        checked={paquete === p.name}
                        onChange={() => setPaquete(p.name)}
                      />
                      {p.name}
                    </label>
                  ))}
                  <label className={`pill-option${paquete === "No sé aún" ? " active" : ""}`}>
                    <input
                      type="radio"
                      name="paquete_ui"
                      checked={paquete === "No sé aún"}
                      onChange={() => setPaquete("No sé aún")}
                    />
                    No sé aún
                  </label>
                </div>
              </div>
              <div className="field">
                <label>¿Cómo nos conociste?</label>
                <select value={fuente} onChange={(e) => setFuente(e.target.value)}>
                  <option value="">Selecciona...</option>
                  {FUENTES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <div className="field">
              <label>Tu mensaje</label>
              <textarea name="mensaje" required />
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
            {sending ? "Enviando..." : tipo === "cotizacion" ? "Enviar solicitud" : "Enviar mensaje"}
          </button>
        </form>
      </div>
    </div>
  );
}
