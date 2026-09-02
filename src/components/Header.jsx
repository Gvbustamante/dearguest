import Button from "./Button.jsx";
import { DiamondIcon } from "./icons.jsx";

const COPY = {
  es: {
    quince: "Quinceañeras",
    bodas: "Bodas",
    paquetes: "Paquetes",
    tematicas: "Temáticas",
    cotizar: "Cotizar",
    contacto: "Contacto",
    cta: "Ver paquetes",
    langLabel: "EN",
    langHref: "/en",
  },
  en: {
    quince: "Quinceañera",
    bodas: "Weddings",
    paquetes: "Packages",
    tematicas: "Themes",
    cotizar: "Get a quote",
    contacto: "Contact",
    cta: "See packages",
    langLabel: "ES",
    langHref: "/",
  },
};

export default function Header({ mode = "quince", onModeChange, lang = "es" }) {
  const isBodas = mode === "bodas";
  const t = COPY[lang] ?? COPY.es;
  return (
    <header>
      <div className="container">
        <nav>
          <a className="brand" href={lang === "en" ? "/en" : "/"}>
            <DiamondIcon className="brand-mark" />
            <span className="brand-name">Dear Guest</span>
          </a>
          <div className="mode-toggle" role="tablist" aria-label="Event type">
            <button
              type="button"
              role="tab"
              aria-selected={!isBodas}
              className={!isBodas ? "active" : ""}
              onClick={() => onModeChange?.("quince")}
            >
              {t.quince}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isBodas}
              className={isBodas ? "active" : ""}
              onClick={() => onModeChange?.("bodas")}
            >
              {t.bodas}
            </button>
          </div>
          <div className="nav-links">
            <a href="#paquetes">{t.paquetes}</a>
            {!isBodas && <a href="#tematicas">{t.tematicas}</a>}
            <a href="#cotizar">{t.cotizar}</a>
            <a href="#contacto">{t.contacto}</a>
          </div>
          <div className="nav-cta">
            <a className="lang-switch" href={t.langHref}>
              {t.langLabel}
            </a>
            <Button href="#paquetes" external={false}>
              {t.cta}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
