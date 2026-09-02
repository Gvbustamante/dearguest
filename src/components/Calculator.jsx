import { useState } from "react";
import { CardIcon, CheckIcon } from "./icons.jsx";
import { formatCOP } from "../data/content.js";
import { usePlans } from "../hooks/usePlans.js";

const DEFAULT_INDEX = 1; // Encanto, igual que en el sitio original

export default function Calculator() {
  const plans = usePlans();
  const [selectedId, setSelectedId] = useState(plans[DEFAULT_INDEX].id);
  const selected = plans.find((p) => p.id === selectedId) ?? plans[DEFAULT_INDEX];
  const savings = selected.originalPrice ? selected.originalPrice - selected.price : 0;

  return (
    <section id="cotizar" className="calculator-section">
      <div className="container">
        <div className="calc-card reveal">
          <div className="calc-head">
            <span className="eyebrow">Cotiza al instante</span>
            <h2>Calcula tu inversión</h2>
            <p>Selecciona el paquete y descubre tu precio especial de hoy.</p>
          </div>

          <div className="calc-opts" role="radiogroup" aria-label="Selecciona un paquete">
            {plans.map((plan) => {
              const isSelected = plan.id === selectedId;
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
                      {plan.featured ? " — Más popular" : ""}
                    </span>
                    <span className="calc-opt-desc">{plan.features.length} funcionalidades</span>
                  </span>
                  <span className="calc-opt-price">
                    {plan.originalPrice && <span className="calc-opt-orig">{formatCOP(plan.originalPrice)}</span>}
                    <span className="calc-opt-curr">{formatCOP(plan.price)}</span>
                  </span>
                </label>
              );
            })}
          </div>

          <div className="calc-result">
            <div className="calc-result-label">Tu inversión hoy</div>
            <div className="calc-result-price">{formatCOP(selected.price)}</div>
            {savings > 0 && <span className="calc-savings">Ahorras {formatCOP(savings)} con el precio especial</span>}
          </div>

          <div className="calc-actions">
            <a className="btn btn-primary" href={selected.wompiUrl} target="_blank" rel="noopener noreferrer">
              <CardIcon />
              Pagar ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
