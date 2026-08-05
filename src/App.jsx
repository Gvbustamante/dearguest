import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import TrustBar from "./components/TrustBar.jsx";
import Benefits from "./components/Benefits.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Pricing from "./components/Pricing.jsx";
import ComparisonTable from "./components/ComparisonTable.jsx";
import Themes from "./components/Themes.jsx";
import Calculator from "./components/Calculator.jsx";
import CTASection from "./components/CTASection.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  // Revela las secciones con .reveal a medida que entran en pantalla.
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
  }, []);

  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <div className="rule" />
        <Benefits />
        <div className="rule" />
        <HowItWorks />
        <div className="rule" />
        <Pricing />
        <ComparisonTable />
        <div className="rule" />
        <Themes />
        <div className="rule" />
        <Calculator />
        <CTASection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
