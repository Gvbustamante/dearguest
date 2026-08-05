import { CheckIcon, DiamondIcon, WhatsAppIcon } from "./icons.jsx";
import { formatCOP, waLink, waPlanMessage } from "../data/content.js";

export default function PlanCard({ name, description, price, originalPrice, priceNote, featured, badge, wompiUrl, features }) {
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
          {originalPrice && <span className="plan-price-orig">{formatCOP(originalPrice)}</span>}
          <div className="plan-price">
            <span className="amount">{formatCOP(price)}</span>
            <span className="cur">COP</span>
          </div>
          {originalPrice ? (
            <span className="plan-save">Ahorras {formatCOP(originalPrice - price)} hoy</span>
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
        <a className="btn btn-primary" href={wompiUrl} target="_blank" rel="noopener noreferrer">
          Pagar y reservar
        </a>
        <a className="plan-wa" href={waLink(waPlanMessage(name, price))} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          ¿Dudas? Escríbenos por WhatsApp
        </a>
      </div>
    </div>
  );
}
