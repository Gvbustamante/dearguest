import { DiamondIcon, InstagramIcon } from "./icons.jsx";
import { ADMIN_URL, ALLIES_URL, INSTAGRAM_HANDLE } from "../data/content.js";

const COPY = {
  es: {
    tagline: "Experiencias digitales para XV años. Hecho con cariño en Barranquilla, Colombia.",
    explore: "Explora",
    paquetes: "Paquetes",
    tematicas: "Temáticas",
    cotizar: "Cotizar",
    contacto: "Contacto",
    contactHeading: "Contacto",
    contactForm: "Formulario de contacto",
    allies: "Programa de Alianzas",
    location: "Barranquilla, Colombia",
    footNote: "Haz que tus 15 brillen desde el primer clic.",
  },
  en: {
    tagline: "Digital experiences for quinceañeras and weddings. Made with love in Barranquilla, Colombia.",
    explore: "Explore",
    paquetes: "Packages",
    tematicas: "Themes",
    cotizar: "Get a quote",
    contacto: "Contact",
    contactHeading: "Contact",
    contactForm: "Contact form",
    allies: "Partner program",
    location: "Barranquilla, Colombia",
    footNote: "Make her 15th shine from the first click.",
  },
};

export default function Footer({ lang = "es" }) {
  const year = new Date().getFullYear();
  const t = COPY[lang] ?? COPY.es;
  const base = lang === "en" ? "/en" : "/es";
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="brand" href={base}>
              <DiamondIcon className="brand-mark" />
              <span className="brand-name">Dear Guest</span>
            </a>
            <p>{t.tagline}</p>
          </div>
          <div className="foot-links">
            <div className="foot-col">
              <h4>{t.explore}</h4>
              <a href={`${base}/#paquetes`}>{t.paquetes}</a>
              <a href={`${base}/#tematicas`}>{t.tematicas}</a>
              <a href={`${base}/#cotizar`}>{t.cotizar}</a>
              <a href={`${base}/#contacto`}>{t.contacto}</a>
            </div>
            <div className="foot-col">
              <h4>{t.contactHeading}</h4>
              <a href={`${base}/#contacto`}>{t.contactForm}</a>
              <a href={`https://instagram.com/${INSTAGRAM_HANDLE}`} target="_blank" rel="noopener noreferrer">
                <InstagramIcon />@{INSTAGRAM_HANDLE}
              </a>
              <a href={ALLIES_URL}>{t.allies}</a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>
            <a href={ADMIN_URL} aria-hidden="true" tabIndex={-1} className="foot-admin-link">
              ©
            </a>{" "}
            {year} Dear Guest — {t.location}
          </span>
          <span>{t.footNote}</span>
        </div>
      </div>
    </footer>
  );
}
