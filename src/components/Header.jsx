import Button from "./Button.jsx";
import { DiamondIcon } from "./icons.jsx";

export default function Header({ mode = "quince", onModeChange }) {
  const isBodas = mode === "bodas";
  return (
    <header>
      <div className="container">
        <nav>
          <a className="brand" href="#top">
            <DiamondIcon className="brand-mark" />
            <span className="brand-name">Dear Guest</span>
          </a>
          <div className="mode-toggle" role="tablist" aria-label="Tipo de evento">
            <button
              type="button"
              role="tab"
              aria-selected={!isBodas}
              className={!isBodas ? "active" : ""}
              onClick={() => onModeChange?.("quince")}
            >
              Quinceañeras
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isBodas}
              className={isBodas ? "active" : ""}
              onClick={() => onModeChange?.("bodas")}
            >
              Bodas
            </button>
          </div>
          <div className="nav-links">
            <a href="#paquetes">Paquetes</a>
            {!isBodas && <a href="#tematicas">Temáticas</a>}
            <a href="#cotizar">Cotizar</a>
            <a href="#contacto">Contacto</a>
          </div>
          <div className="nav-cta">
            <Button href="#paquetes" external={false}>
              Ver paquetes
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
