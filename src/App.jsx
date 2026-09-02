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

export default function App() {
  const [mode, setMode] = useState("quince");
  const isBodas = mode === "bodas";

  // Revela las secciones con .reveal a medida que entran en pantalla.
  // Se vuelve a ejecutar al cambiar de modo porque el contenido de las
  // secciones se reemplaza (nuevos nodos .reveal que aún no fueron observados).
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
  }, [mode]);

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
