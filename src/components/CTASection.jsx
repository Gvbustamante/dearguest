import Button from "./Button.jsx";
import { DiamondIcon } from "./icons.jsx";

const COPY = {
  es: {
    quince: {
      heading: "Elige tu paquete y aparta tu fecha hoy.",
      body: "Pago seguro con Wompi — tarjeta, PSE o Nequi. Entrega en 3 a 5 días hábiles.",
      href: "#paquetes",
      label: "Ver paquetes y precios",
    },
    bodas: {
      heading: "Cotiza tu boda y recibe tu propuesta hoy.",
      body: "Cuéntanos tu fecha, estilo e invitados — te respondemos con tu cotización en menos de 24 horas.",
      href: "#cotizar",
      label: "Cotizar mi boda",
    },
  },
  en: {
    quince: {
      heading: "Pick your package and save your date today.",
      body: "Ask us about payment options. Delivered in 3 to 5 business days.",
      href: "#paquetes",
      label: "See packages & pricing",
    },
    bodas: {
      heading: "Get your wedding quote today.",
      body: "Tell us your date, style and guest count — we'll reply with your quote in under 24 hours.",
      href: "#cotizar",
      label: "Get my wedding quote",
    },
  },
};

export default function CTASection({ mode = "quince", lang = "es" }) {
  const t = (COPY[lang] ?? COPY.es)[mode] ?? COPY.es.quince;
  return (
    <section className="cta">
      <DiamondIcon className="cta-watermark" aria-hidden="true" />
      <div className="container">
        <div className="cta-inner reveal">
          <DiamondIcon className="cta-diamond" />
          <h2>{t.heading}</h2>
          <p>{t.body}</p>
          <Button href={t.href} external={false}>
            {t.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
