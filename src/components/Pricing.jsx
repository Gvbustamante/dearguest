import PlanCard from "./PlanCard.jsx";
import { usePlans } from "../hooks/usePlans.js";

const COPY = {
  es: {
    eyebrow: "Paquetes",
    title: "Tres formas de celebrar",
    body: "Todos incluyen sitio web personalizado, código QR y confirmación de asistencia.",
  },
  en: {
    eyebrow: "Packages",
    title: "Three ways to celebrate",
    body: "Every package includes a custom website, QR code and RSVP confirmations.",
  },
};

export default function Pricing({ lang = "es" }) {
  const currency = lang === "en" ? "usd" : "cop";
  const plans = usePlans("quince", currency);
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
