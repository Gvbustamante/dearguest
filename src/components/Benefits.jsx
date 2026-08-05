import BenefitCard from "./BenefitCard.jsx";
import { benefits } from "../data/content.js";

export default function Benefits() {
  return (
    <section className="benefits">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Por qué Dear Guest</span>
          <h2>No es una invitación. Es un recuerdo digital.</h2>
          <p>
            La información del evento ya no se pierde en cadenas de WhatsApp — y tus invitados tienen todo en un
            solo lugar, siempre a mano.
          </p>
        </div>
        <div className="benefit-grid reveal">
          {benefits.map((b) => (
            <BenefitCard key={b.title} {...b} />
          ))}
        </div>
      </div>
    </section>
  );
}
