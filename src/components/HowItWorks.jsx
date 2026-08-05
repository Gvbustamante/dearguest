import { steps } from "../data/content.js";

export default function HowItWorks() {
  return (
    <section id="como-funciona">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">El proceso</span>
          <h2>De la idea al QR en {steps.length} pasos</h2>
          <p>Tú nos cuentas la historia. Nosotras construimos el sitio.</p>
        </div>
        <ol className="steps reveal">
          {steps.map((step, index) => (
            <li className="step" key={step.title}>
              <span className="step-pin">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
