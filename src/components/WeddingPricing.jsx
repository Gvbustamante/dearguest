import PlanCard from "./PlanCard.jsx";
import { usePlans } from "../hooks/usePlans.js";

const COPY = {
  es: {
    eyebrow: "Experiencias disponibles",
    title: "Elige tu experiencia",
    body: "Cada plan incluye personalización total, diseño exclusivo y acceso permanente desde cualquier dispositivo.",
  },
  en: {
    eyebrow: "Available experiences",
    title: "Choose your experience",
    body: "Every plan includes full personalization, exclusive design and permanent access from any device.",
  },
};

export default function WeddingPricing({ lang = "es" }) {
  const currency = lang === "en" ? "usd" : "cop";
  const plans = usePlans("bodas", currency);
  const t = COPY[lang] ?? COPY.es;
  return (
    <section id="paquetes" className="paquetes-section">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>{t.title}</h2>
          <p>{t.body}</p>
        </div>
        <div className="pricing reveal">
          {plans.map((plan) => (
            <PlanCard key={plan.id} {...plan} currency={currency} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
