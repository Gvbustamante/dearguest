import ThemeCard from "./ThemeCard.jsx";
import { themes } from "../data/content.js";

export default function Themes() {
  return (
    <section id="tematicas">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Temáticas</span>
          <h2>Elige el mundo de tu fiesta</h2>
          <p>No se empieza desde cero — cada temática ya tiene su propio carácter.</p>
        </div>
        <div className="themes reveal">
          {themes.map((theme) => (
            <ThemeCard key={theme.id} {...theme} />
          ))}
        </div>
      </div>
    </section>
  );
}
