import PlanCard from "./PlanCard.jsx";
import { usePlans } from "../hooks/usePlans.js";

const COPY = {
  es: {
    eyebrow: "Más experiencias",
    title: "¿Celebras algo más?",
    body: "También hacemos sitios digitales para bautizos, cumpleaños y renovaciones de votos.",
  },
  en: {
    eyebrow: "More experiences",
    title: "Celebrating something else?",
    body: "We also build digital experiences for baptisms, birthdays and vow renewals.",
  },
};

const GROUPS = {
  es: [
    { category: "bautizo", label: "Bautizo / Baby" },
    { category: "cumpleanos", label: "Cumpleaños" },
    { category: "renovacion", label: "Renovación de votos" },
  ],
  en: [
    { category: "bautizo", label: "Baptism / Baby" },
    { category: "cumpleanos", label: "Birthday" },
    { category: "renovacion", label: "Vow renewal" },
  ],
};

function ExperienceGroup({ category, label, currency, lang }) {
  const plans = usePlans(category, currency);
  if (plans.length === 0) return null;
  return (
    <div className="other-exp-group">
      <h3>{label}</h3>
      <div className="pricing other-exp-grid">
        {plans.map((plan) => (
          <PlanCard key={plan.id} {...plan} currency={currency} lang={lang} />
        ))}
      </div>
    </div>
  );
}

export default function OtherExperiences({ lang = "es" }) {
  const currency = lang === "en" ? "usd" : "cop";
  const t = COPY[lang] ?? COPY.es;
  const groups = GROUPS[lang] ?? GROUPS.es;

  return (
    <section id="otras-experiencias">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>{t.title}</h2>
          <p>{t.body}</p>
        </div>
        <div className="other-exp-groups reveal">
          {groups.map((g) => (
            <ExperienceGroup key={g.category} category={g.category} label={g.label} currency={currency} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
