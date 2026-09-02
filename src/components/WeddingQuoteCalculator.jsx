import { useState } from "react";
import { CheckIcon, WhatsAppIcon } from "./icons.jsx";
import { formatCOP, weddingPlans, weddingExtras, waWeddingQuoteMessage } from "../data/content.js";
import { supabase } from "../lib/supabase.js";

const DEFAULT_INDEX = 1; // Nupcial, el más solicitado

export default function WeddingQuoteCalculator() {
  const [selectedId, setSelectedId] = useState(weddingPlans[DEFAULT_INDEX].id);
  const [extraIds, setExtraIds] = useState([]);
  const [guests, setGuests] = useState("");

  const selected = weddingPlans.find((p) => p.id === selectedId) ?? weddingPlans[DEFAULT_INDEX];
  const selectedExtras = weddingExtras.filter((e) => extraIds.includes(e.id));
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const total = selected.price + extrasTotal;

  function toggleExtra(id) {
    setExtraIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function saveLead() {
    // Guarda la cotización como lead en Supabase — aparece en /admin > Mensajes,
    // igual que el resto de formularios del sitio. Falla en silencio.
    supabase
      .from("contact_messages")
      .insert({
        nombre: "Cotización de boda",
        contacto: guests ? `${guests} invitados aprox.` : "Invitados sin definir",
        tipo_consulta: "Cotización boda",
        mensaje: `Paquete: ${selected.name} (${formatCOP(selected.price)}). Extras: ${
          selectedExtras.map((e) => e.name).join(", ") || "Ninguno"
        }. Total estimado: ${formatCOP(total)}.`,
      })
      .then(() => {});
  }

  const waHref = waWeddingQuoteMessage({ plan: selected, extras: selectedExtras, guests, total });

  return (
    <section id="cotizar" className="calculator-section">
      <div className="container">
        <div className="calc-card reveal">
          <div className="calc-head">
            <span className="eyebrow">Cotiza al instante</span>
            <h2>Arma tu experiencia de boda</h2>
            <p>Elige tu paquete, súmale extras y recibe tu cotización exacta.</p>
          </div>

          <div className="calc-opts" role="radiogroup" aria-label="Selecciona un paquete">
            {weddingPlans.map((plan) => {
              const isSelected = plan.id === selectedId;
              return (
                <label className={`calc-opt${isSelected ? " sel" : ""}`} key={plan.id}>
                  <input
                    type="radio"
                    name="wedding-pkg"
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
                      {plan.featured ? " — Más solicitado" : ""}
                    </span>
                    <span className="calc-opt-desc">{plan.tagline}</span>
                  </span>
                  <span className="calc-opt-price">
                    <span className="calc-opt-curr">{formatCOP(plan.price)}</span>
                  </span>
                </label>
              );
            })}
          </div>

          <div className="calc-extras">
            <span className="calc-extras-label">Extras opcionales</span>
            {weddingExtras.map((extra) => {
              const checked = extraIds.includes(extra.id);
              return (
                <label className={`calc-extra${checked ? " sel" : ""}`} key={extra.id}>
                  <input type="checkbox" checked={checked} onChange={() => toggleExtra(extra.id)} />
                  <span className="calc-extra-check" aria-hidden="true">
                    {checked && <CheckIcon />}
                  </span>
                  <span className="calc-extra-name">{extra.name}</span>
                  <span className="calc-extra-price">+{formatCOP(extra.price)}</span>
                </label>
              );
            })}
          </div>

          <div className="cf-field">
            <label htmlFor="wedding-guests">Número de invitados aprox. (informativo)</label>
            <input
              id="wedding-guests"
              type="number"
              min="0"
              placeholder="Ej. 120"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>

          <div className="calc-result">
            <div className="calc-result-label">Tu cotización estimada</div>
            <div className="calc-result-price">{formatCOP(total)}</div>
          </div>

          <div className="calc-actions">
            <a
              className="btn btn-primary"
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={saveLead}
            >
              <WhatsAppIcon />
              Enviar cotización por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
