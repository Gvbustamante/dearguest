import Button from "./Button.jsx";
import { CheckIcon, DiamondIcon } from "./icons.jsx";
import { formatCOP, waLink } from "../data/content.js";

export default function PlanCard({ name, description, price, featured, features }) {
  return (
    <div className={`plan${featured ? " featured" : ""}`}>
      <div className="plan-perf" aria-hidden="true" />
      {featured && (
        <div className="plan-seal" aria-hidden="true">
          <DiamondIcon />
          <span>La favorita</span>
        </div>
      )}
      <div className="plan-body">
        <div className="plan-name">{name}</div>
        <p className="plan-desc">{description}</p>
        <div className="plan-price">
          <span className="cur">$</span>
          <span className="amount">{formatCOP(price)}</span>
          <span className="cur">COP</span>
        </div>
        <ul className="plan-list">
          {features.map((feature) => (
            <li key={feature}>
              <CheckIcon />
              {feature}
            </li>
          ))}
        </ul>
        <Button href={waLink(`Hola! Quiero el paquete ${name}`)}>Elegir {name}</Button>
      </div>
    </div>
  );
}
