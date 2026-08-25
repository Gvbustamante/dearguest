import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppTop from "../components/AppTop.jsx";
import { supabase } from "../lib/supabase.js";
import { syncToNotion } from "../lib/notion.js";

export default function Personalizacion() {
  const [params] = useSearchParams();
  const paquete = params.get("paquete") || "";

  const [files, setFiles] = useState([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function uploadFotos() {
    const urls = [];
    for (const file of files) {
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("dearguest-uploads").upload(path, file);
      if (upErr) continue;
      const { data } = supabase.storage.from("dearguest-uploads").getPublicUrl(path);
      urls.push(data.publicUrl);
    }
    return urls;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.target);
    setSending(true);

    const archivos = await uploadFotos();

    const record = {
      nombre_quinceanera: form.get("nombre_quinceanera")?.trim(),
      whatsapp: form.get("whatsapp")?.trim(),
      paquete: paquete || null,
      lugar: form.get("lugar")?.trim(),
      direccion: form.get("direccion")?.trim(),
      hora: form.get("hora"),
      historia: form.get("historia")?.trim() || null,
      colores_tema: form.get("colores_tema")?.trim() || null,
      redes_evento: form.get("redes_evento")?.trim() || null,
      agradecimientos: form.get("agradecimientos")?.trim() || null,
      link_drive: form.get("link_drive")?.trim() || null,
      archivos,
    };

    const { data, error: dbError } = await supabase.rpc("dearguest_submit_personalizacion", { p: record });
    setSending(false);

    if (dbError) {
      setError("No pudimos guardar tu información. Intenta de nuevo o escríbenos por WhatsApp.");
      return;
    }
    setSent(true);
    syncToNotion("personalizacion", data);
  }

  if (sent) {
    return (
      <div className="app-page">
        <AppTop />
        <div className="card gracias-banner">
          <div className="emoji">🎉</div>
          <div className="card-title" style={{ textAlign: "center" }}>
            ¡Gracias!
          </div>
          <p style={{ color: "var(--ink-soft)" }}>
            Ya tenemos todo lo que necesitamos para construir tu sitio. Te avisamos por WhatsApp cuando esté listo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <AppTop />
      {paquete && (
        <div className="card gracias-banner">
          <div className="emoji">🎉</div>
          <div style={{ fontWeight: 700, color: "var(--wine)" }}>¡Gracias por tu compra!</div>
          <p style={{ color: "var(--ink-soft)", fontSize: ".9rem", margin: "4px 0 0" }}>
            Confirmamos tu <strong>Paquete {paquete}</strong>. Completa estos datos para empezar a construir tu sitio.
          </p>
        </div>
      )}
      <div className="card">
        <div className="card-title">Personaliza tu sitio</div>
        <div className="card-sub">Cuéntanos todos los detalles para construir tu experiencia digital</div>
        <div className="divider" />
        {error && <div className="alert alert-error">⚠️ {error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Nombre de la quinceañera</label>
            <input type="text" name="nombre_quinceanera" required />
          </div>
          <div className="field-row">
            <div className="field">
              <label>Lugar del evento</label>
              <input type="text" name="lugar" required />
            </div>
            <div className="field">
              <label>Hora del evento</label>
              <input type="time" name="hora" required />
            </div>
          </div>
          <div className="field">
            <label>Dirección completa</label>
            <input type="text" name="direccion" required />
          </div>
          <div className="field">
            <label>Historia o mensaje de la quinceañera</label>
            <textarea name="historia" placeholder="Cuéntanos su historia, gustos, sueños..." />
          </div>
          <div className="field">
            <label>Colores / tema definitivo</label>
            <input type="text" name="colores_tema" placeholder="Ej: Dorado y rosa pastel" />
          </div>
          <div className="field">
            <label>
              Fotos (puedes subir varias)
              <span className="hint">O comparte el link de tu carpeta de Drive abajo</span>
            </label>
            <input
              className="file-input"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />
          </div>
          <div className="field">
            <label>Link de Drive (opcional)</label>
            <input type="url" name="link_drive" placeholder="https://drive.google.com/..." />
          </div>
          <div className="field">
            <label>Instagram / hashtag del evento (opcional)</label>
            <input type="text" name="redes_evento" placeholder="@usuario o #Mis15Camila" />
          </div>
          <div className="field">
            <label>Padrinos / agradecimientos (opcional)</label>
            <textarea name="agradecimientos" />
          </div>
          <div className="field">
            <label>WhatsApp de contacto</label>
            <input type="tel" name="whatsapp" required />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
            {sending ? "Enviando..." : "Enviar información"}
          </button>
        </form>
      </div>
    </div>
  );
}
