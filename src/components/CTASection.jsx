import Button from "./Button.jsx";
import { DiamondIcon, WhatsAppIcon } from "./icons.jsx";
import { waLink } from "../data/content.js";

export default function CTASection() {
  return (
    <section>
      <div className="container">
        <div className="cta reveal">
          <DiamondIcon className="cta-diamond" />
          <h2>Cuéntanos de tu quinceañera y empecemos hoy.</h2>
          <p>Respondemos en menos de 2 horas en horario laboral. Sin compromiso.</p>
          <Button href={waLink()} icon={<WhatsAppIcon />}>
            Escríbenos por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
