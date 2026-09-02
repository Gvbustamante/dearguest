import { useState } from "react";
import Button from "./Button.jsx";
import Footer from "./Footer.jsx";
import BenefitCard from "./BenefitCard.jsx";
import { DiamondIcon } from "./icons.jsx";
import {
  alliesAudience,
  alliesBenefits,
  alliesSteps,
  alliesBusinessTypes,
  CONTACT_FORM_ENDPOINT,
} from "../data/content.js";
import { supabase } from "../lib/supabase.js";

const STATUS = { IDLE: "idle", SENDING: "sending", OK: "ok", ERROR: "error" };

function AlliesHeader() {
  return (
    <header>
      <div className="container">
        <nav>
          <a className="brand" href="/">
            <DiamondIcon className="brand-mark" />
            <span className="brand-name">Dear Guest</span>
          </a>
          <div className="nav-cta">
            <Button href="/" external={false} variant="ghost">
              Volver al inicio
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

function AlliesForm() {
  const [status, setStatus] = useState(STATUS.IDLE);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SENDING);
    const form = event.target;
    const data = new FormData(form);

    const nombre = data.get("nombre");
    const contacto = data.get("contacto");
    const negocio = data.get("negocio");
    const tipo = data.get("tipo_negocio");
    const detalle = data.get("mensaje");
    const mensaje = `Negocio: ${negocio} — Tipo: ${tipo}. ${detalle}`;

    // Se guarda como mensaje de contacto (tipo "Aliado/Planner") para que
    // aparezca en el mismo panel /admin, junto a los demás mensajes.
    supabase
      .from("contact_messages")
      .insert({ nombre, contacto, tipo_consulta: "Aliado/Planner", mensaje })
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
    <div className="contact-card reveal">
      {status === STATUS.OK ? (
        <div className="cf-msg cf-msg-ok">
          <strong>¡Postulación enviada!</strong>
          <p>Gracias por tu interés. Te contactamos en menos de 48 horas.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="cf-field">
            <label htmlFor="al-nombre">Tu nombre</label>
            <input id="al-nombre" type="text" name="nombre" required />
          </div>
          <div className="cf-field">
            <label htmlFor="al-negocio">Nombre del negocio o marca</label>
            <input id="al-negocio" type="text" name="negocio" required />
          </div>
          <div className="cf-field">
            <label htmlFor="al-tipo">Tipo de negocio</label>
            <select id="al-tipo" name="tipo_negocio" required defaultValue="">
              <option value="" disabled>
                Selecciona...
              </option>
              {alliesBusinessTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="cf-field">
            <label htmlFor="al-contacto">WhatsApp o email</label>
            <input id="al-contacto" type="text" name="contacto" required />
          </div>
          <div className="cf-field">
            <label htmlFor="al-mensaje">Cuéntanos sobre tu negocio</label>
            <textarea id="al-mensaje" name="mensaje" required />
          </div>
          <button type="submit" className="btn btn-primary cf-submit" disabled={status === STATUS.SENDING}>
            {status === STATUS.SENDING ? "Enviando…" : "Enviar postulación"}
          </button>
          {status === STATUS.ERROR && (
            <p className="cf-msg-error">Algo salió mal. Intenta de nuevo en un momento.</p>
          )}
        </form>
      )}
    </div>
  );
}

export default function AlliesPage() {
  return (
    <div>
      <AlliesHeader />
      <main>
        <section className="cta allies-hero">
          <div className="container cta-inner">
            <DiamondIcon className="cta-diamond" />
            <span className="eyebrow">Programa de Alianzas</span>
            <h1>Refiere, y crece con Dear Guest</h1>
            <p>
              Para wedding & event planners, fotógrafos, decoradores y todo profesional que acompaña a familias en
              la fiesta de XV años.
            </p>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Para quién es</span>
              <h2>¿Trabajas con quinceañeras?</h2>
              <p>Si tus clientes celebran XV años, este programa es para ti.</p>
            </div>
            <ul className="allies-audience reveal">
              {alliesAudience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className="rule" />

        <section>
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Qué recibes</span>
              <h2>Aliarte tiene sus beneficios</h2>
            </div>
            <div className="benefit-row reveal">
              {alliesBenefits.map((b) => (
                <BenefitCard key={b.title} {...b} />
              ))}
            </div>
          </div>
        </section>

        <div className="rule" />

        <section>
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">El proceso</span>
              <h2>Así funciona</h2>
            </div>
            <ol className="steps steps-3 reveal">
              {alliesSteps.map((step, index) => (
                <li className="step" key={step.title}>
                  <span className="step-pin">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="postulacion">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Postúlate</span>
              <h2>Únete al programa</h2>
              <p>Cuéntanos sobre tu negocio y te contactamos para coordinar los siguientes pasos.</p>
            </div>
            <AlliesForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
