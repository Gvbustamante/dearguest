import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminApp from "./admin/AdminApp.jsx";
import AlliesPage from "./components/AlliesPage.jsx";
import { captureReferralFromUrl } from "./lib/referral.js";

captureReferralFromUrl();

const path = window.location.pathname;

// El idioma por defecto de la raíz "/" se define por plataforma (variable de
// entorno en build time) — así el mismo código sirve ES/COP en un dominio y
// EN/USD en otro, sin cambiar ni una línea entre despliegues. Netlify no la
// define (queda en "es"); en Vercel se configura VITE_DEFAULT_LANG=en desde
// su dashboard. "/en" y "/es" siempre fuerzan un idioma, sin importar la
// plataforma, para que el switch de idioma nunca dependa del valor por
// defecto vigente.
const defaultLang = import.meta.env.VITE_DEFAULT_LANG === "en" ? "en" : "es";

// "/en/..." y "/es/..." siempre fuerzan idioma, sin importar la plataforma.
// Sin prefijo, se usa el idioma por defecto de la plataforma (ver arriba).
const langPrefixMatch = path.match(/^\/(en|es)(\/|$)/);
const lang = langPrefixMatch ? langPrefixMatch[1] : defaultLang;
const rest = langPrefixMatch ? path.slice(langPrefixMatch[0].length - (langPrefixMatch[2] === "/" ? 1 : 0)) : path;

const page = path.startsWith("/admin")
  ? "admin"
  : rest.startsWith("/alianzas")
    ? "alianzas"
    : "home";

const routes = {
  admin: <AdminApp />,
  alianzas: <AlliesPage lang={lang} />,
  home: <App lang={lang} />,
};

createRoot(document.getElementById("root")).render(<StrictMode>{routes[page]}</StrictMode>);
