import { useState } from "react";
import { CONTACT_FORM_ENDPOINT } from "../data/content.js";
import { supabase } from "../lib/supabase.js";

const STATUS = { IDLE: "idle", SENDING: "sending", OK: "ok", ERROR: "error" };

const COPY = {
  es: {
    eyebrow: "Hablemos",
    title: "¿Tienes preguntas?",
    body: "Escríbenos y te respondemos lo antes posible.",
    name: "Nombre",
    contact: "WhatsApp o email",
    typeLabel: "Tipo de consulta",
    typeSelect: "Selecciona...",
    types: [
      ["Cliente nuevo", "Soy cliente nuevo"],
      ["Aliado/Planner", "Soy wedding/event planner"],
      ["Soporte", "Necesito soporte en mi sitio"],
      ["Otro", "Otro"],
    ],
    message: "Mensaje",
    sending: "Enviando…",
    send: "Enviar mensaje",
    okTitle: "¡Mensaje enviado!",
    okBody: "Te responderemos pronto.",
    error: "Algo salió mal. Intenta de nuevo o escríbenos por WhatsApp.",
  },
  en: {
    eyebrow: "Let's talk",
    title: "Have any questions?",
    body: "Write to us and we'll get back to you as soon as possible.",
    name: "Name",
    contact: "WhatsApp or email",
    typeLabel: "What do you need?",
    typeSelect: "Select...",
    types: [
      ["Cliente nuevo", "I'm a new client"],
      ["Aliado/Planner", "I'm a wedding/event planner"],
      ["Soporte", "I need support on my site"],
      ["Otro", "Other"],
    ],
    message: "Message",
    sending: "Sending…",
    send: "Send message",
    okTitle: "Message sent!",
    okBody: "We'll get back to you soon.",
    error: "Something went wrong. Try again or write to us on WhatsApp.",
  },
};

export default function ContactForm({ lang = "es" }) {
  const [status, setStatus] = useState(STATUS.IDLE);
  const t = COPY[lang] ?? COPY.es;

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SENDING);
    const form = event.target;
    const data = new FormData(form);

    // Guarda una copia en Supabase para que el panel /admin la muestre.
    // Falla en silencio: nunca debe bloquear el envío por Formspree.
    supabase
      .from("contact_messages")
      .insert({
        nombre: data.get("nombre"),
        contacto: data.get("contacto"),
        tipo_consulta: data.get("tipo_consulta"),
        mensaje: data.get("mensaje"),
      })
      .then(() => {});

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus(STATUS.OK);
        form.reset();
      } else {
        setStatus(STATUS.ERROR);
      }
    } catch {
      setStatus(STATUS.ERROR);
    }
  }

  return (
    <section id="contacto">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>{t.title}</h2>
          <p>{t.body}</p>
        </div>

        <div className="contact-card reveal">
          {status === STATUS.OK ? (
            <div className="cf-msg cf-msg-ok">
              <strong>{t.okTitle}</strong>
              <p>{t.okBody}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="cf-field">
                <label htmlFor="cf-nombre">{t.name}</label>
                <input id="cf-nombre" type="text" name="nombre" required />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-contacto">{t.contact}</label>
                <input id="cf-contacto" type="text" name="contacto" required />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-tipo">{t.typeLabel}</label>
                <select id="cf-tipo" name="tipo_consulta" required defaultValue="">
                  <option value="" disabled>
                    {t.typeSelect}
                  </option>
                  {t.types.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="cf-field">
                <label htmlFor="cf-mensaje">{t.message}</label>
                <textarea id="cf-mensaje" name="mensaje" required />
              </div>
              <button type="submit" className="btn btn-primary cf-submit" disabled={status === STATUS.SENDING}>
                {status === STATUS.SENDING ? t.sending : t.send}
              </button>
              {status === STATUS.ERROR && <p className="cf-msg cf-msg-error">{t.error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
