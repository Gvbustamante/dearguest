import { CheckIcon, XIcon, DiamondIcon } from "./icons.jsx";
import { formatCOP, waWeddingQuoteMessage } from "../data/content.js";

export default function WeddingPlanCard({ name, tagline, price, featured, badge, features, excluded }) {
  const waHref = waWeddingQuoteMessage({ plan: { name, price }, extras: [], guests: null, total: price });

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
        <p className="plan-desc">{tagline}</p>
        <div className="plan-price-row">
          <div className="plan-price">
            <span className="amount">{formatCOP(price)}</span>
            <span className="cur">COP</span>
          </div>
        </div>
        <ul className="plan-list">
          {features.map((feature) => (
            <li key={feature}>
              <CheckIcon />
              {feature}
            </li>
          ))}
          {excluded.map((feature) => (
            <li className="off" key={feature}>
              <XIcon />
              {feature}
            </li>
          ))}
        </ul>
        <a className="btn btn-primary" href={waHref} target="_blank" rel="noopener noreferrer">
          Cotizar por WhatsApp
        </a>
      </div>
    </div>
  );
}
