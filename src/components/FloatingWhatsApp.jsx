import { WhatsAppIcon } from "./icons.jsx";
import { waLink } from "../data/content.js";

const COPY = {
  es: { message: "Hola! Vi la página de Dear Guest y tengo una duda.", aria: "Escríbenos por WhatsApp" },
  en: { message: "Hi! I saw the Dear Guest page and I have a question.", aria: "Message us on WhatsApp" },
};

export default function FloatingWhatsApp({ lang = "es" }) {
  const t = COPY[lang] ?? COPY.es;
  return (
    <a className="wa-float" href={waLink(t.message)} target="_blank" rel="noopener noreferrer" aria-label={t.aria}>
      <WhatsAppIcon />
    </a>
  );
}
