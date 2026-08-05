import Button from "./Button.jsx";
import InviteCard from "./InviteCard.jsx";
import { WhatsAppIcon } from "./icons.jsx";
import { waLink } from "../data/content.js";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="reveal">
          <span className="eyebrow">Experiencias digitales para XV años</span>
          <h1>
            Haz que tus 15 brillen
            <br />
            <em>desde el primer clic.</em>
          </h1>
          <p className="lede">
            Un sitio web hecho a mano para tu quinceañera: sus fotos, su música, su historia — y un código QR que
            cada invitado lleva en su celular. No se pierde, no se daña. Queda para siempre.
          </p>
          <div className="hero-actions">
            <Button href={waLink()} icon={<WhatsAppIcon />}>
              Escríbenos por WhatsApp
            </Button>
            <Button href="#paquetes" variant="ghost" external={false}>
              Ver paquetes y precios
            </Button>
          </div>
          <div className="hero-note">
            <span>
              <strong>3–5 días</strong> de entrega
            </span>
            <span>
              <strong>4</strong> temáticas para elegir
            </span>
            <span>
              <strong>QR + RSVP</strong> incluidos
            </span>
          </div>
        </div>

        <div className="reveal">
          <InviteCard />
        </div>
      </div>
    </section>
  );
}
