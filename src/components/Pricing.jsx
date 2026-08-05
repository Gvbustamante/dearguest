import PlanCard from "./PlanCard.jsx";
import { plans } from "../data/content.js";

export default function Pricing() {
  return (
    <section id="paquetes" className="paquetes-section">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Paquetes</span>
          <h2>Tres formas de celebrar</h2>
          <p>Todos incluyen sitio web personalizado, código QR y confirmación de asistencia.</p>
        </div>
        <div className="pricing reveal">
          {plans.map((plan) => (
            <PlanCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
