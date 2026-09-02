import { useState } from "react";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import TrustBar from "./components/TrustBar.jsx";
import Benefits from "./components/Benefits.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Pricing from "./components/Pricing.jsx";
import ComparisonTable from "./components/ComparisonTable.jsx";
import Themes from "./components/Themes.jsx";
import Calculator from "./components/Calculator.jsx";
import WeddingPricing from "./components/WeddingPricing.jsx";
import WeddingQuoteCalculator from "./components/WeddingQuoteCalculator.jsx";
import OtherExperiences from "./components/OtherExperiences.jsx";
import CTASection from "./components/CTASection.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import CustomSection from "./components/CustomSection.jsx";
import { useSections } from "./hooks/useSections.js";

export default function App({ lang = "es" }) {
  const [mode, setMode] = useState("quince");
  const isBodas = mode === "bodas";
  const customSections = useSections(mode);
  // La tabla comparativa solo existe en español por ahora (contenido muy
  // específico de quinceañeras COP) — se omite en la versión en inglés.
  const showComparison = lang === "es";

  // Revela las secciones con .reveal a medida que entran en pantalla.
  // Se vuelve a ejecutar al cambiar de modo o al llegar secciones personalizadas
  // (nuevos nodos .reveal que aún no fueron observados).
  useRevealOnScroll([mode, customSections.length]);

  return (
    <div id="top">
      <Header mode={mode} onModeChange={setMode} lang={lang} />
      <main>
        <Hero mode={mode} lang={lang} />
        {!isBodas && <TrustBar lang={lang} />}
        <div className="rule" />
        <Benefits mode={mode} lang={lang} />
        <div className="rule" />
        <HowItWorks mode={mode} lang={lang} />
        {customSections.length > 0 && <div className="rule" />}
        {customSections.map((s) => (
          <CustomSection key={s.id} type={s.type} content={s.content} />
        ))}
        <div className="rule" />
        {isBodas ? (
          <WeddingPricing lang={lang} />
        ) : (
          <>
            <Pricing lang={lang} />
            {showComparison && <ComparisonTable />}
            <div className="rule" />
            <Themes lang={lang} />
          </>
        )}
        <div className="rule" />
        <OtherExperiences lang={lang} />
        <div className="rule" />
        {isBodas ? <WeddingQuoteCalculator lang={lang} /> : <Calculator lang={lang} />}
        <CTASection mode={mode} lang={lang} />
        <ContactForm lang={lang} />
      </main>
      <Footer lang={lang} />
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
