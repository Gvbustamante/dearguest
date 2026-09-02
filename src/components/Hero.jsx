import Button from "./Button.jsx";
import InviteCard from "./InviteCard.jsx";

export default function Hero({ mode = "quince" }) {
  if (mode === "bodas") {
    return (
      <section className="hero">
        <div className="container hero-grid">
          <div className="reveal">
            <span className="eyebrow">Experiencias digitales para bodas</span>
            <h1>
              Tu boda merece
              <br />
              <em>más que una tarjeta.</em>
            </h1>
            <p className="lede">
              Una invitación digital hecha a mano: fotos, historia de la pareja, RSVP y cuenta regresiva — el primer
              momento que tus invitados viven de tu gran día. No se pierde, no se daña. Queda para siempre.
            </p>
            <div className="hero-actions">
              <Button href="#paquetes" external={false}>
                Ver experiencias y precios
              </Button>
              <Button href="#cotizar" variant="ghost" external={false}>
                Cotizar mi boda
              </Button>
            </div>
            <div className="hero-note">
              <span>
                <strong>5 días</strong> de entrega
              </span>
              <span>
                <strong>RSVP</strong> y confirmaciones
              </span>
              <span>
                <strong>Cuenta regresiva</strong> en vivo
              </span>
            </div>
          </div>

          <div className="reveal">
            <InviteCard name="Ingrid & Sebastián" date="14 de febrero · Club Lagos de Caujaral" confirmations={96} />
          </div>
        </div>
      </section>
    );
  }

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
            <Button href="#paquetes" external={false}>
              Ver paquetes y precios
            </Button>
            <Button href="#tematicas" variant="ghost" external={false}>
              Ver temáticas
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
