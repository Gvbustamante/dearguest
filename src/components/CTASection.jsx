import Button from "./Button.jsx";
import { DiamondIcon } from "./icons.jsx";

export default function CTASection() {
  return (
    <section className="cta">
      <DiamondIcon className="cta-watermark" aria-hidden="true" />
      <div className="container">
        <div className="cta-inner reveal">
          <DiamondIcon className="cta-diamond" />
          <h2>Elige tu paquete y aparta tu fecha hoy.</h2>
          <p>Pago seguro con Wompi — tarjeta, PSE o Nequi. Entrega en 3 a 5 días hábiles.</p>
          <Button href="#paquetes" external={false}>
            Ver paquetes y precios
          </Button>
        </div>
      </div>
    </section>
  );
}
