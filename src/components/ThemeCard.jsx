import { ArrowIcon } from "./icons.jsx";

export default function ThemeCard({ name, description, image, badge, demoUrl }) {
  return (
    <div className="theme-card">
      <div className="theme-swatch-wrap">
        <img className="theme-swatch" src={image} alt={`Ejemplo de sitio temática ${name}`} loading="lazy" />
        {badge && <span className="theme-badge">{badge}</span>}
      </div>
      <div className="theme-body">
        <h3>{name}</h3>
        <p>{description}</p>
        <a href={demoUrl} target="_blank" rel="noopener noreferrer">
          Ver demo <ArrowIcon />
        </a>
      </div>
    </div>
  );
}
