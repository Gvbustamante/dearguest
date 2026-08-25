import { DiamondIcon, InstagramIcon } from "./icons.jsx";
import { ADMIN_URL, ALLIES_URL, INSTAGRAM_HANDLE } from "../data/content.js";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="brand" href="#top">
              <DiamondIcon className="brand-mark" />
              <span className="brand-name">Dear Guest</span>
            </a>
            <p>Experiencias digitales para XV años. Hecho con cariño en Barranquilla, Colombia.</p>
          </div>
          <div className="foot-links">
            <div className="foot-col">
              <h4>Explora</h4>
              <a href="#paquetes">Paquetes</a>
              <a href="#tematicas">Temáticas</a>
              <a href="#cotizar">Cotizar</a>
              <a href="#contacto">Contacto</a>
            </div>
            <div className="foot-col">
              <h4>Contacto</h4>
              <a href="#contacto">Formulario de contacto</a>
              <a href={`https://instagram.com/${INSTAGRAM_HANDLE}`} target="_blank" rel="noopener noreferrer">
                <InstagramIcon />@{INSTAGRAM_HANDLE}
              </a>
              {ALLIES_URL && (
                <a href={ALLIES_URL} target="_blank" rel="noopener noreferrer">
                  Programa de Alianzas
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>
            <a href={ADMIN_URL} aria-hidden="true" tabIndex={-1} className="foot-admin-link">
              ©
            </a>{" "}
            {year} Dear Guest — Barranquilla, Colombia
          </span>
          <span>Haz que tus 15 brillen desde el primer clic.</span>
        </div>
      </div>
    </footer>
  );
}
