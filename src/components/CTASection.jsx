import Button from "./Button.jsx";
import { DiamondIcon } from "./icons.jsx";

export default function CTASection({ mode = "quince" }) {
  const isBodas = mode === "bodas";
  return (
    <section className="cta">
      <DiamondIcon className="cta-watermark" aria-hidden="true" />
      <div className="container">
        <div className="cta-inner reveal">
          <DiamondIcon className="cta-diamond" />
          <h2>{isBodas ? "Cotiza tu boda y recibe tu propuesta hoy." : "Elige tu paquete y aparta tu fecha hoy."}</h2>
          <p>
            {isBodas
              ? "Cuéntanos tu fecha, estilo e invitados — te respondemos con tu cotización en menos de 24 horas."
              : "Pago seguro con Wompi — tarjeta, PSE o Nequi. Entrega en 3 a 5 días hábiles."}
          </p>
          <Button href={isBodas ? "#cotizar" : "#paquetes"} external={false}>
            {isBodas ? "Cotizar mi boda" : "Ver paquetes y precios"}
          </Button>
        </div>
      </div>
    </section>
  );
}
