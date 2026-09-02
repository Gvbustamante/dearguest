import ThemeCard from "./ThemeCard.jsx";
import { themes } from "../data/content.js";

const COPY = {
  es: { eyebrow: "Temáticas", title: "Elige el mundo de tu fiesta", body: "No se empieza desde cero — cada temática ya tiene su propio carácter." },
  en: { eyebrow: "Themes", title: "Choose your party's world", body: "You don't start from scratch — every theme already has its own character." },
};

export default function Themes({ lang = "es" }) {
  const t = COPY[lang] ?? COPY.es;
  return (
    <section id="tematicas">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>{t.title}</h2>
          <p>{t.body}</p>
        </div>
        <div className="themes reveal">
          {themes.map((theme) => (
            <ThemeCard key={theme.id} {...theme} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
