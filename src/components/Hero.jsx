import Button from "./Button.jsx";
import InviteCard from "./InviteCard.jsx";
import { useHeroBackground } from "../hooks/useHeroBackground.js";

const CONTENT = {
  quince: {
    eyebrow: "Experiencias digitales para XV años",
    title: (
      <>
        Haz que tus 15 brillen
        <br />
        <em>desde el primer clic.</em>
      </>
    ),
    lede: "Un sitio web hecho a mano para tu quinceañera: sus fotos, su música, su historia — y un código QR que cada invitado lleva en su celular. No se pierde, no se daña. Queda para siempre.",
    primaryHref: "#paquetes",
    primaryLabel: "Ver paquetes y precios",
    ghostHref: "#tematicas",
    ghostLabel: "Ver temáticas",
    notes: [
      { strong: "3–5 días", label: "de entrega" },
      { strong: "4", label: "temáticas para elegir" },
      { strong: "QR + RSVP", label: "incluidos" },
    ],
    invite: { name: "Valentina", date: "15 de noviembre · Barranquilla", confirmations: 128 },
  },
  bodas: {
    eyebrow: "Experiencias digitales para bodas",
    title: (
      <>
        Tu boda merece
        <br />
        <em>más que una tarjeta.</em>
      </>
    ),
    lede: "Una invitación digital hecha a mano: fotos, historia de la pareja, RSVP y cuenta regresiva — el primer momento que tus invitados viven de tu gran día. No se pierde, no se daña. Queda para siempre.",
    primaryHref: "#paquetes",
    primaryLabel: "Ver experiencias y precios",
    ghostHref: "#cotizar",
    ghostLabel: "Cotizar mi boda",
    notes: [
      { strong: "5 días", label: "de entrega" },
      { strong: "RSVP", label: "y confirmaciones" },
      { strong: "Cuenta regresiva", label: "en vivo" },
    ],
    invite: { name: "Ingrid & Sebastián", date: "14 de febrero · Club Lagos de Caujaral", confirmations: 96 },
  },
};

export default function Hero({ mode = "quince" }) {
  const bgUrl = useHeroBackground(mode);
  const content = CONTENT[mode] ?? CONTENT.quince;

  return (
    <section className={`hero${bgUrl ? " hero-has-bg" : ""}`} style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}>
      <div className="container hero-grid">
        <div className="reveal">
          <span className="eyebrow">{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p className="lede">{content.lede}</p>
          <div className="hero-actions">
            <Button href={content.primaryHref} external={false}>
              {content.primaryLabel}
            </Button>
            <Button href={content.ghostHref} variant="ghost" external={false}>
              {content.ghostLabel}
            </Button>
          </div>
          <div className="hero-note">
            {content.notes.map((n) => (
              <span key={n.label}>
                <strong>{n.strong}</strong> {n.label}
              </span>
            ))}
          </div>
        </div>

        <div className="reveal">
          <InviteCard {...content.invite} />
        </div>
      </div>
    </section>
  );
}
