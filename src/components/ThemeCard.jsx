import { ArrowIcon } from "./icons.jsx";

export default function ThemeCard({ name, description, gradient, demoUrl }) {
  return (
    <div className="theme-card">
      <div className="theme-swatch" style={{ background: gradient }} />
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
