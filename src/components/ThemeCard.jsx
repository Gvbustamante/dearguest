import { ArrowIcon } from "./icons.jsx";

export default function ThemeCard({ name, nameEn, description, descriptionEn, image, badge, badgeEn, demoUrl, lang = "es" }) {
  const displayName = lang === "en" ? nameEn || name : name;
  const displayDesc = lang === "en" ? descriptionEn || description : description;
  const displayBadge = lang === "en" ? badgeEn || badge : badge;
  return (
    <div className="theme-card">
      <div className="theme-swatch-wrap">
        <img className="theme-swatch" src={image} alt={displayName} loading="lazy" />
        {displayBadge && <span className="theme-badge">{displayBadge}</span>}
      </div>
      <div className="theme-body">
        <h3>{displayName}</h3>
        <p>{displayDesc}</p>
        <a href={demoUrl} target="_blank" rel="noopener noreferrer">
          {lang === "en" ? "View demo" : "Ver demo"} <ArrowIcon />
        </a>
      </div>
    </div>
  );
}
