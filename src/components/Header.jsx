import Button from "./Button.jsx";
import { DiamondIcon, WhatsAppIcon } from "./icons.jsx";
import { waLink } from "../data/content.js";

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
            <a href="#como-funciona">Cómo funciona</a>
          </div>
          <div className="nav-cta">
            <Button href={waLink()} icon={<WhatsAppIcon />}>
              WhatsApp
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
