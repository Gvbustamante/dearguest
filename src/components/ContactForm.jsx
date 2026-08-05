import { useState } from "react";
import { CONTACT_FORM_ENDPOINT } from "../data/content.js";

const STATUS = { IDLE: "idle", SENDING: "sending", OK: "ok", ERROR: "error" };

export default function ContactForm() {
  const [status, setStatus] = useState(STATUS.IDLE);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SENDING);
    const form = event.target;
    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
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
          <span className="eyebrow">Hablemos</span>
          <h2>¿Tienes preguntas?</h2>
          <p>Escríbenos y te respondemos lo antes posible.</p>
        </div>

        <div className="contact-card reveal">
          {status === STATUS.OK ? (
            <div className="cf-msg cf-msg-ok">
              <strong>¡Mensaje enviado!</strong>
              <p>Te responderemos pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="cf-field">
                <label htmlFor="cf-nombre">Nombre</label>
                <input id="cf-nombre" type="text" name="nombre" required />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-contacto">WhatsApp o email</label>
                <input id="cf-contacto" type="text" name="contacto" required />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-tipo">Tipo de consulta</label>
                <select id="cf-tipo" name="tipo_consulta" required defaultValue="">
                  <option value="" disabled>
                    Selecciona...
                  </option>
                  <option value="Cliente nuevo">Soy cliente nuevo</option>
                  <option value="Aliado/Planner">Soy wedding/event planner</option>
                  <option value="Soporte">Necesito soporte en mi sitio</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div className="cf-field">
                <label htmlFor="cf-mensaje">Mensaje</label>
                <textarea id="cf-mensaje" name="mensaje" required />
              </div>
              <button type="submit" className="btn btn-primary cf-submit" disabled={status === STATUS.SENDING}>
                {status === STATUS.SENDING ? "Enviando…" : "Enviar mensaje"}
              </button>
              {status === STATUS.ERROR && (
                <p className="cf-msg cf-msg-error">Algo salió mal. Intenta de nuevo o escríbenos por WhatsApp.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
