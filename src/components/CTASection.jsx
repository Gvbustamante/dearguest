import Button from "./Button.jsx";
import { DiamondIcon } from "./icons.jsx";

export default function CTASection() {
  return (
    <section className="cta">
      <DiamondIcon className="cta-watermark" aria-hidden="true" />
      <div className="container">
        <div className="cta-inner reveal">
          <DiamondIcon className="cta-diamond" />
          <h2>Cuéntanos de tu quinceañera y empecemos hoy.</h2>
          <p>Respondemos en menos de 2 horas en horario laboral. Sin compromiso.</p>
          <Button to="/cotizar">Cotiza tu sitio →</Button>
        </div>
      </div>
    </section>
  );
}
