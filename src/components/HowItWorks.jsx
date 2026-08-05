import { steps } from "../data/content.js";

export default function HowItWorks() {
  return (
    <section id="como-funciona">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">El proceso</span>
          <h2>De la idea al QR en 5 pasos</h2>
          <p>Tú nos cuentas la historia. Nosotras construimos el sitio.</p>
        </div>
        <div className="steps reveal">
          {steps.map((step) => (
            <div className="step" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
