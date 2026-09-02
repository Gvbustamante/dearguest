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
import { slugifyReferralCode } from "../lib/referral.js";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll.js";

const STATUS = { IDLE: "idle", SENDING: "sending", OK: "ok", ERROR: "error" };

const COPY = {
  es: {
    home: "/es",
    back: "Volver al inicio",
    heroEyebrow: "Programa de Alianzas",
    heroTitle: "Refiere, y crece con Dear Guest",
    heroBody:
      "Para wedding & event planners, fotógrafos, decoradores y todo profesional que acompaña a familias en la fiesta de XV años.",
    audienceEyebrow: "Para quién es",
    audienceTitle: "¿Trabajas con quinceañeras?",
    audienceBody: "Si tus clientes celebran XV años, este programa es para ti.",
    benefitsEyebrow: "Qué recibes",
    benefitsTitle: "Aliarte tiene sus beneficios",
    stepsEyebrow: "El proceso",
    stepsTitle: "Así funciona",
    applyEyebrow: "Postúlate",
    applyTitle: "Únete al programa",
    applyBody: "Cuéntanos sobre tu negocio y te contactamos para coordinar los siguientes pasos.",
    formName: "Tu nombre",
    formBusiness: "Nombre del negocio o marca",
    formType: "Tipo de negocio",
    formSelect: "Selecciona...",
    formContact: "WhatsApp o email",
    formMessage: "Cuéntanos sobre tu negocio",
    sending: "Enviando…",
    send: "Enviar postulación",
    okTitle: "¡Postulación enviada!",
    okBody: "Gracias por tu interés. Te contactamos en menos de 48 horas.",
    referralIntro: "Ya puedes empezar a compartir tu link de referido:",
    error: "Algo salió mal. Intenta de nuevo en un momento.",
  },
  en: {
    home: "/en",
    back: "Back to home",
    heroEyebrow: "Partner Program",
    heroTitle: "Refer, and grow with Dear Guest",
    heroBody: "For wedding & event planners, photographers, decorators and any professional working with quinceañera families.",
    audienceEyebrow: "Who it's for",
    audienceTitle: "Do you work with quinceañeras?",
    audienceBody: "If your clients celebrate quinceañeras, this program is for you.",
    benefitsEyebrow: "What you get",
    benefitsTitle: "Partnering has its perks",
    stepsEyebrow: "The process",
    stepsTitle: "How it works",
    applyEyebrow: "Apply",
    applyTitle: "Join the program",
    applyBody: "Tell us about your business and we'll reach out to coordinate the next steps.",
    formName: "Your name",
    formBusiness: "Business or brand name",
    formType: "Business type",
    formSelect: "Select...",
    formContact: "WhatsApp or email",
    formMessage: "Tell us about your business",
    sending: "Sending…",
    send: "Send application",
    okTitle: "Application sent!",
    okBody: "Thanks for your interest. We'll reach out within 48 hours.",
    referralIntro: "You can start sharing your referral link now:",
    error: "Something went wrong. Please try again in a moment.",
  },
};

function AlliesHeader({ lang }) {
  const t = COPY[lang] ?? COPY.es;
  return (
    <header>
      <div className="container">
        <nav>
          <a className="brand" href={t.home}>
            <DiamondIcon className="brand-mark" />
            <span className="brand-name">Dear Guest</span>
          </a>
          <div className="nav-cta">
            <Button href={t.home} external={false} variant="ghost">
              {t.back}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

function AlliesForm({ lang }) {
  const t = COPY[lang] ?? COPY.es;
  const [status, setStatus] = useState(STATUS.IDLE);
  const [referralLink, setReferralLink] = useState("");

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
    const referralCode = slugifyReferralCode(negocio);

    // Se guarda como mensaje de contacto (tipo "Aliado/Planner") para que
    // aparezca en el mismo panel /admin, junto a los demás mensajes.
    supabase
      .from("contact_messages")
      .insert({ nombre, contacto, tipo_consulta: "Aliado/Planner", mensaje })
      .then(() => {});

    // Crea el registro de aliado con su código de referido — visible y
    // administrable desde /admin > Aliados en cuanto se aprueba.
    supabase
      .from("allies")
      .insert({
        name: nombre,
        business_name: negocio,
        business_type: tipo,
        contact: contacto,
        referral_code: referralCode,
        notes: detalle,
      })
      .then(() => {});

    setReferralLink(`${window.location.origin}/?ref=${referralCode}`);

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
          <strong>{t.okTitle}</strong>
          <p>{t.okBody}</p>
          <p className="allies-referral-preview">
            {t.referralIntro}
            <br />
            <strong>{referralLink}</strong>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="cf-field">
            <label htmlFor="al-nombre">{t.formName}</label>
            <input id="al-nombre" type="text" name="nombre" required />
          </div>
          <div className="cf-field">
            <label htmlFor="al-negocio">{t.formBusiness}</label>
            <input id="al-negocio" type="text" name="negocio" required />
          </div>
          <div className="cf-field">
            <label htmlFor="al-tipo">{t.formType}</label>
            <select id="al-tipo" name="tipo_negocio" required defaultValue="">
              <option value="" disabled>
                {t.formSelect}
              </option>
              {alliesBusinessTypes.map((type) => (
                <option key={type.es} value={type.es}>
                  {lang === "en" ? type.en : type.es}
                </option>
              ))}
            </select>
          </div>
          <div className="cf-field">
            <label htmlFor="al-contacto">{t.formContact}</label>
            <input id="al-contacto" type="text" name="contacto" required />
          </div>
          <div className="cf-field">
            <label htmlFor="al-mensaje">{t.formMessage}</label>
            <textarea id="al-mensaje" name="mensaje" required />
          </div>
          <button type="submit" className="btn btn-primary cf-submit" disabled={status === STATUS.SENDING}>
            {status === STATUS.SENDING ? t.sending : t.send}
          </button>
          {status === STATUS.ERROR && <p className="cf-msg-error">{t.error}</p>}
        </form>
      )}
    </div>
  );
}

export default function AlliesPage({ lang = "es" }) {
  const t = COPY[lang] ?? COPY.es;
  useRevealOnScroll([lang]);
  return (
    <div>
      <AlliesHeader lang={lang} />
      <main>
        <section className="cta allies-hero">
          <div className="container cta-inner">
            <DiamondIcon className="cta-diamond" />
            <span className="eyebrow">{t.heroEyebrow}</span>
            <h1>{t.heroTitle}</h1>
            <p>{t.heroBody}</p>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">{t.audienceEyebrow}</span>
              <h2>{t.audienceTitle}</h2>
              <p>{t.audienceBody}</p>
            </div>
            <ul className="allies-audience reveal">
              {alliesAudience.map((item) => (
                <li key={item.es}>{lang === "en" ? item.en : item.es}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className="rule" />

        <section>
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">{t.benefitsEyebrow}</span>
              <h2>{t.benefitsTitle}</h2>
            </div>
            <div className="benefit-row reveal">
              {alliesBenefits.map((b) => (
                <BenefitCard
                  key={b.title}
                  title={lang === "en" ? b.titleEn : b.title}
                  body={lang === "en" ? b.bodyEn : b.body}
                  icon={b.icon}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="rule" />

        <section>
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">{t.stepsEyebrow}</span>
              <h2>{t.stepsTitle}</h2>
            </div>
            <ol className="steps steps-3 reveal">
              {alliesSteps.map((step, index) => (
                <li className="step" key={step.title}>
                  <span className="step-pin">{index + 1}</span>
                  <h3>{lang === "en" ? step.titleEn : step.title}</h3>
                  <p>{lang === "en" ? step.bodyEn : step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="postulacion">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">{t.applyEyebrow}</span>
              <h2>{t.applyTitle}</h2>
              <p>{t.applyBody}</p>
            </div>
            <AlliesForm lang={lang} />
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
