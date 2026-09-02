import { useEffect, useState } from "react";
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
import CTASection from "./components/CTASection.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import CustomSection from "./components/CustomSection.jsx";
import { useSections } from "./hooks/useSections.js";

export default function App() {
  const [mode, setMode] = useState("quince");
  const isBodas = mode === "bodas";
  const customSections = useSections(mode);

  // Revela las secciones con .reveal a medida que entran en pantalla.
  // Se vuelve a ejecutar al cambiar de modo o al llegar secciones personalizadas
  // (nuevos nodos .reveal que aún no fueron observados).
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [mode, customSections.length]);

  return (
    <div id="top">
      <Header mode={mode} onModeChange={setMode} />
      <main>
        <Hero mode={mode} />
        {!isBodas && <TrustBar />}
        <div className="rule" />
        <Benefits mode={mode} />
        <div className="rule" />
        <HowItWorks mode={mode} />
        {customSections.length > 0 && <div className="rule" />}
        {customSections.map((s) => (
          <CustomSection key={s.id} type={s.type} content={s.content} />
        ))}
        <div className="rule" />
        {isBodas ? (
          <WeddingPricing />
        ) : (
          <>
            <Pricing />
            <ComparisonTable />
            <div className="rule" />
            <Themes />
          </>
        )}
        <div className="rule" />
        {isBodas ? <WeddingQuoteCalculator /> : <Calculator />}
        <CTASection mode={mode} />
        <ContactForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
