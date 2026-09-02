import BenefitCard from "./BenefitCard.jsx";
import { benefits, weddingBenefits } from "../data/content.js";

const COPY = {
  es: {
    quince: {
      eyebrow: "Por qué Dear Guest",
      title: "No es una invitación. Es un recuerdo digital.",
      body: "La información del evento ya no se pierde en cadenas de WhatsApp — y tus invitados tienen todo en un solo lugar, siempre a mano.",
    },
    bodas: {
      eyebrow: "Nuestra promesa",
      title: "No creamos invitaciones. Creamos la primera experiencia de tu gran día.",
      body: "Cada detalle de tu boda merece ser vivido — incluso antes de que empiece. Tu experiencia digital es el primer momento que tus invitados tendrán de ese día.",
    },
  },
  en: {
    quince: {
      eyebrow: "Why Dear Guest",
      title: "It's not an invitation. It's a digital keepsake.",
      body: "Event info no longer gets lost in WhatsApp chains — and your guests have everything in one place, always at hand.",
    },
    bodas: {
      eyebrow: "Our promise",
      title: "We don't build invitations. We build the first experience of your big day.",
      body: "Every detail of your wedding deserves to be lived — even before it begins. Your digital experience is the first moment your guests will have of that day.",
    },
  },
};

export default function Benefits({ mode = "quince", lang = "es" }) {
  const isBodas = mode === "bodas";
  const items = isBodas ? weddingBenefits : benefits;
  const t = (COPY[lang] ?? COPY.es)[mode] ?? COPY.es.quince;
  return (
    <section className="benefits">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>{t.title}</h2>
          <p>{t.body}</p>
        </div>
        <div className={`benefit-row reveal${isBodas ? " benefit-row-4" : ""}`}>
          {items.map((b) => (
            <BenefitCard
              key={b.title}
              title={lang === "en" ? b.titleEn || b.title : b.title}
              body={lang === "en" ? b.bodyEn || b.body : b.body}
              icon={b.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
