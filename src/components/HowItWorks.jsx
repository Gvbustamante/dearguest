import { steps, weddingSteps } from "../data/content.js";

export default function HowItWorks({ mode = "quince" }) {
  const isBodas = mode === "bodas";
  const items = isBodas ? weddingSteps : steps;
  return (
    <section id="como-funciona">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">El proceso</span>
          <h2>{isBodas ? "Simple, rápido y sin complicaciones." : `De la idea al QR en ${items.length} pasos`}</h2>
          <p>Tú nos cuentas la historia. Nosotras construimos el sitio.</p>
        </div>
        <ol className={`steps reveal${isBodas ? " steps-5" : ""}`}>
          {items.map((step, index) => (
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
