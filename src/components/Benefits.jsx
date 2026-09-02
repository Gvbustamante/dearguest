import BenefitCard from "./BenefitCard.jsx";
import { benefits, weddingBenefits } from "../data/content.js";

export default function Benefits({ mode = "quince" }) {
  const isBodas = mode === "bodas";
  const items = isBodas ? weddingBenefits : benefits;
  return (
    <section className="benefits">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{isBodas ? "Nuestra promesa" : "Por qué Dear Guest"}</span>
          <h2>{isBodas ? "No creamos invitaciones. Creamos la primera experiencia de tu gran día." : "No es una invitación. Es un recuerdo digital."}</h2>
          <p>
            {isBodas
              ? "Cada detalle de tu boda merece ser vivido — incluso antes de que empiece. Tu experiencia digital es el primer momento que tus invitados tendrán de ese día."
              : "La información del evento ya no se pierde en cadenas de WhatsApp — y tus invitados tienen todo en un solo lugar, siempre a mano."}
          </p>
        </div>
        <div className={`benefit-row reveal${isBodas ? " benefit-row-4" : ""}`}>
          {items.map((b) => (
            <BenefitCard key={b.title} {...b} />
          ))}
        </div>
      </div>
    </section>
  );
}
