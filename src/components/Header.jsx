import Button from "./Button.jsx";
import { DiamondIcon } from "./icons.jsx";

export default function Header() {
  return (
    <header>
      <div className="container">
        <nav>
          <a className="brand" href="#top">
            <DiamondIcon className="brand-mark" />
            <span className="brand-name">Dear Guest</span>
          </a>
          <div className="nav-links">
            <a href="#paquetes">Paquetes</a>
            <a href="#tematicas">Temáticas</a>
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
