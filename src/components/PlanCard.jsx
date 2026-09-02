import { CheckIcon, DiamondIcon } from "./icons.jsx";
import { formatPrice, waPlanQuoteMessage } from "../data/content.js";

const LABELS = {
  es: { pay: "Pagar y reservar", quote: "Cotizar por WhatsApp" },
  en: { pay: "Pay & book now", quote: "Ask for a quote on WhatsApp" },
};

export default function PlanCard({ name, description, price, originalPrice, priceNote, featured, badge, wompiUrl, features, currency = "cop", lang = "es" }) {
  const t = LABELS[lang] ?? LABELS.es;
  const savings = originalPrice ? originalPrice - price : 0;
  const hasPayment = Boolean(wompiUrl);
  const ctaHref = hasPayment ? wompiUrl : waPlanQuoteMessage({ name, price, currency }, lang);

  return (
    <div className={`plan${featured ? " featured" : ""}`}>
      <div className="plan-perf" aria-hidden="true" />
      {badge && (
        <div className="plan-seal" aria-hidden="true">
          <DiamondIcon />
          <span>{badge}</span>
        </div>
      )}
      <div className="plan-body">
        <div className="plan-name">{name}</div>
        <p className="plan-desc">{description}</p>
        <div className="plan-price-row">
          {originalPrice && <span className="plan-price-orig">{formatPrice(originalPrice, currency)}</span>}
          <div className="plan-price">
            <span className="amount">{formatPrice(price, currency)}</span>
            <span className="cur">{currency.toUpperCase()}</span>
          </div>
          {savings > 0 ? (
            <span className="plan-save">
              {lang === "en" ? "Save" : "Ahorras"} {formatPrice(savings, currency)} {lang === "en" ? "today" : "hoy"}
            </span>
          ) : (
            priceNote && <span className="plan-note">{priceNote}</span>
          )}
        </div>
        <ul className="plan-list">
          {features.map((feature) => (
            <li key={feature}>
              <CheckIcon />
              {feature}
            </li>
          ))}
        </ul>
        <a className="btn btn-primary" href={ctaHref} target="_blank" rel="noopener noreferrer">
          {hasPayment ? t.pay : t.quote}
        </a>
      </div>
    </div>
  );
}
