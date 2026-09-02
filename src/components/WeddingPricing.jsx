import WeddingPlanCard from "./WeddingPlanCard.jsx";
import { weddingPlans } from "../data/content.js";

export default function WeddingPricing() {
  return (
    <section id="paquetes" className="paquetes-section">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Experiencias disponibles</span>
          <h2>Elige tu experiencia</h2>
          <p>Cada plan incluye personalización total, diseño exclusivo y acceso permanente desde cualquier dispositivo.</p>
        </div>
        <div className="pricing reveal">
          {weddingPlans.map((plan) => (
            <WeddingPlanCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
