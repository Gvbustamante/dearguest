import { WhatsAppIcon } from "./icons.jsx";
import { waLink } from "../data/content.js";

export default function FloatingWhatsApp() {
  return (
    <a
      className="wa-float"
      href={waLink("Hola! Vi la página de Dear Guest y tengo una duda.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}
