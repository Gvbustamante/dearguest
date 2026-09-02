import { useState } from "react";
import { CheckIcon, WhatsAppIcon } from "./icons.jsx";
import { formatPrice, weddingExtras, waWeddingQuoteMessage } from "../data/content.js";
import { usePlans } from "../hooks/usePlans.js";
import { supabase } from "../lib/supabase.js";

const DEFAULT_INDEX = 1; // Nupcial, el más solicitado

const COPY = {
  es: {
    eyebrow: "Cotiza al instante",
    title: "Arma tu experiencia de boda",
    body: "Elige tu paquete, súmale extras y recibe tu cotización exacta.",
    popular: " — Más solicitado",
    extras: "Extras opcionales",
    guestsLabel: "Número de invitados aprox. (informativo)",
    guestsPlaceholder: "Ej. 120",
    resultLabel: "Tu cotización estimada",
    send: "Enviar cotización por WhatsApp",
  },
  en: {
    eyebrow: "Instant quote",
    title: "Build your wedding experience",
    body: "Pick your package, add extras and get your exact quote.",
    popular: " — Most requested",
    extras: "Optional extras",
    guestsLabel: "Approx. guest count (informational)",
    guestsPlaceholder: "e.g. 120",
    resultLabel: "Your estimated quote",
    send: "Send quote via WhatsApp",
  },
};

export default function WeddingQuoteCalculator({ lang = "es" }) {
  const currency = lang === "en" ? "usd" : "cop";
  const plans = usePlans("bodas", currency);
  const t = COPY[lang] ?? COPY.es;
  const [selectedId, setSelectedId] = useState(null);
  const [extraIds, setExtraIds] = useState([]);
  const [guests, setGuests] = useState("");

  const activeId = selectedId ?? plans[DEFAULT_INDEX]?.id ?? plans[0]?.id;
  const selected = plans.find((p) => p.id === activeId) ?? plans[0];

  const selectedExtras = weddingExtras.filter((e) => extraIds.includes(e.id));
  const extraPrice = (e) => (currency === "usd" ? e.priceUsd : e.price);
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + extraPrice(e), 0);
  const total = (selected?.price ?? 0) + extrasTotal;

  function toggleExtra(id) {
    setExtraIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function saveLead() {
    if (!selected) return;
    // Guarda la cotización como lead en Supabase — aparece en /admin > Mensajes.
    supabase
      .from("contact_messages")
      .insert({
        nombre: lang === "en" ? "Wedding quote" : "Cotización de boda",
        contacto: guests ? `${guests} ${lang === "en" ? "guests" : "invitados aprox."}` : lang === "en" ? "Guests TBD" : "Invitados sin definir",
        tipo_consulta: "Cotización boda",
        mensaje: `Paquete: ${selected.name} (${formatPrice(selected.price, currency)} ${currency.toUpperCase()}). Extras: ${
          selectedExtras.map((e) => e.name[lang] || e.name.es).join(", ") || "Ninguno"
        }. Total estimado: ${formatPrice(total, currency)} ${currency.toUpperCase()}.`,
      })
      .then(() => {});
  }

  if (!selected) return null;

  const waHref = waWeddingQuoteMessage({ plan: selected, extras: selectedExtras, guests, total, currency, lang });

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
                      {plan.featured ? t.popular : ""}
                    </span>
                    <span className="calc-opt-desc">{plan.description}</span>
                  </span>
                  <span className="calc-opt-price">
                    <span className="calc-opt-curr">{formatPrice(plan.price, currency)}</span>
                  </span>
                </label>
              );
            })}
          </div>

          <div className="calc-extras">
            <span className="calc-extras-label">{t.extras}</span>
            {weddingExtras.map((extra) => {
              const checked = extraIds.includes(extra.id);
              return (
                <label className={`calc-extra${checked ? " sel" : ""}`} key={extra.id}>
                  <input type="checkbox" checked={checked} onChange={() => toggleExtra(extra.id)} />
                  <span className="calc-extra-check" aria-hidden="true">
                    {checked && <CheckIcon />}
                  </span>
                  <span className="calc-extra-name">{extra.name[lang] || extra.name.es}</span>
                  <span className="calc-extra-price">+{formatPrice(extraPrice(extra), currency)}</span>
                </label>
              );
            })}
          </div>

          <div className="cf-field">
            <label htmlFor="wedding-guests">{t.guestsLabel}</label>
            <input
              id="wedding-guests"
              type="number"
              min="0"
              placeholder={t.guestsPlaceholder}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>

          <div className="calc-result">
            <div className="calc-result-label">{t.resultLabel}</div>
            <div className="calc-result-price">{formatPrice(total, currency)}</div>
          </div>

          <div className="calc-actions">
            <a className="btn btn-primary" href={waHref} target="_blank" rel="noopener noreferrer" onClick={saveLead}>
              <WhatsAppIcon />
              {t.send}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
