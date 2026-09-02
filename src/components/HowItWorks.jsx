import { steps, weddingSteps } from "../data/content.js";

const COPY = {
  es: {
    eyebrow: "El proceso",
    quinceTitle: (n) => `De la idea al QR en ${n} pasos`,
    bodasTitle: "Simple, rápido y sin complicaciones.",
    body: "Tú nos cuentas la historia. Nosotras construimos el sitio.",
  },
  en: {
    eyebrow: "The process",
    quinceTitle: (n) => `From idea to QR in ${n} steps`,
    bodasTitle: "Simple, fast and hassle-free.",
    body: "You tell us the story. We build the site.",
  },
};

export default function HowItWorks({ mode = "quince", lang = "es" }) {
  const isBodas = mode === "bodas";
  const items = isBodas ? weddingSteps : steps;
  const t = COPY[lang] ?? COPY.es;
  return (
    <section id="como-funciona">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>{isBodas ? t.bodasTitle : t.quinceTitle(items.length)}</h2>
          <p>{t.body}</p>
        </div>
        <ol className={`steps reveal${isBodas ? " steps-5" : ""}`}>
          {items.map((step, index) => (
            <li className="step" key={step.title}>
              <span className="step-pin">{index + 1}</span>
              <h3>{lang === "en" ? step.titleEn || step.title : step.title}</h3>
              <p>{lang === "en" ? step.bodyEn || step.body : step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
