import { useState } from "react";
import { CardIcon, CheckIcon } from "./icons.jsx";
import { formatPrice, waPlanQuoteMessage } from "../data/content.js";
import { usePlans } from "../hooks/usePlans.js";

const DEFAULT_INDEX = 1; // Encanto, igual que en el sitio original

const COPY = {
  es: {
    eyebrow: "Cotiza al instante",
    title: "Calcula tu inversión",
    body: "Selecciona el paquete y descubre tu precio especial de hoy.",
    features: (n) => `${n} funcionalidades`,
    popular: " — Más popular",
    resultLabel: "Tu inversión hoy",
    savings: "Ahorras",
    today: "con el precio especial",
    pay: "Pagar ahora",
    quote: "Cotizar por WhatsApp",
  },
  en: {
    eyebrow: "Instant quote",
    title: "Calculate your investment",
    body: "Select your package and see today's special price.",
    features: (n) => `${n} features`,
    popular: " — Most popular",
    resultLabel: "Your investment today",
    savings: "You save",
    today: "with today's special price",
    pay: "Pay now",
    quote: "Ask for a quote on WhatsApp",
  },
};

export default function Calculator({ lang = "es" }) {
  const currency = lang === "en" ? "usd" : "cop";
  const plans = usePlans("quince", currency);
  const t = COPY[lang] ?? COPY.es;
  const [selectedId, setSelectedId] = useState(null);

  const activeId = selectedId ?? plans[DEFAULT_INDEX]?.id ?? plans[0]?.id;
  const selected = plans.find((p) => p.id === activeId) ?? plans[0];
  if (!selected) return null;
  const savings = selected.originalPrice ? selected.originalPrice - selected.price : 0;
  const hasPayment = Boolean(selected.wompiUrl);

  return (
    <section id="cotizar" className="calculator-section">
      <div className="container">
        <div className="calc-card reveal">
          <div className="calc-head">
            <span className="eyebrow">{t.eyebrow}</span>
            <h2>{t.title}</h2>
            <p>{t.body}</p>
          </div>

          <div className="calc-opts" role="radiogroup" aria-label={t.title}>
            {plans.map((plan) => {
              const isSelected = plan.id === activeId;
              return (
                <label className={`calc-opt${isSelected ? " sel" : ""}`} key={plan.id}>
                  <input
                    type="radio"
                    name="pkg"
                    value={plan.id}
                    checked={isSelected}
                    onChange={() => setSelectedId(plan.id)}
                  />
                  <span className="calc-radio" aria-hidden="true">
                    {isSelected && <CheckIcon />}
                  </span>
                  <span className="calc-opt-label">
                    <span className="calc-opt-name">
                      {plan.name}
                      {plan.featured ? t.popular : ""}
                    </span>
                    <span className="calc-opt-desc">{t.features(plan.features.length)}</span>
                  </span>
                  <span className="calc-opt-price">
                    {plan.originalPrice && <span className="calc-opt-orig">{formatPrice(plan.originalPrice, currency)}</span>}
                    <span className="calc-opt-curr">{formatPrice(plan.price, currency)}</span>
                  </span>
                </label>
              );
            })}
          </div>

          <div className="calc-result">
            <div className="calc-result-label">{t.resultLabel}</div>
            <div className="calc-result-price">{formatPrice(selected.price, currency)}</div>
            {savings > 0 && (
              <span className="calc-savings">
                {t.savings} {formatPrice(savings, currency)} {t.today}
              </span>
            )}
          </div>

          <div className="calc-actions">
            {hasPayment ? (
              <a className="btn btn-primary" href={selected.wompiUrl} target="_blank" rel="noopener noreferrer">
                <CardIcon />
                {t.pay}
              </a>
            ) : (
              <a className="btn btn-primary" href={waPlanQuoteMessage(selected, lang)} target="_blank" rel="noopener noreferrer">
                <CardIcon />
                {t.quote}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
