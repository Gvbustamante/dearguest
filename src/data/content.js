// Fuente única de contenido — precios, textos, enlaces reales y temáticas del negocio Dear Guest.
// Mantener sincronizado con la Biblia del Negocio en Notion y con los links de pago de Wompi.

export const WHATSAPP_NUMBER = "573246102594";
export const INSTAGRAM_HANDLE = "gise.co_";
export const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/xppazlvn";

export function waLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const trustStats = [
  { n: "+150", l: "Quinceañeras celebradas" },
  { n: "8", l: "Temáticas exclusivas" },
  { n: "100%", l: "Personalizado" },
  { n: "4.8 ★", l: "Valoración promedio" },
];

export const benefits = [
  {
    title: "Todo en un solo lugar",
    body: "Fecha, ubicación, itinerario, música y galería — sin repetir la misma pregunta veinte veces.",
    icon: "heart",
  },
  {
    title: "Se abre desde cualquier celular",
    body: "Escanean el QR con la cámara y ya. Sin apps, sin descargas — si un abuelo puede hacerlo, todos pueden.",
    icon: "phone",
  },
  {
    title: "Queda para siempre",
    body: "No se pierde como una tarjeta física. El sitio y sus recuerdos siguen ahí mucho después de la fiesta.",
    icon: "clock",
  },
];

export const steps = [
  { title: "Elige tu paquete", body: "Selecciona el paquete que más se adapta a lo que quieres y págalo en línea." },
  { title: "Comparte tu info y temática", body: "Cuéntanos la temática, fotos, música y todos los detalles del evento de tu hija." },
  { title: "Recibe tu sitio", body: "En 3 a 5 días hábiles, listo para revisar y aprobar." },
  { title: "Comparte el QR", body: "Tus invitados lo escanean y confirman asistencia al instante." },
];

// Feature keys en orden — usados también por la tabla comparativa (ComparisonTable).
export const featureCatalog = [
  "Tarjeta digital personalizada",
  "Código QR para compartir",
  "Sitio web personalizado",
  "Confirmación de asistencia (RSVP)",
  "Ubicación con Google Maps",
  "Sección lluvia de sobres",
  "Dress code",
  "Música de bienvenida",
  "Historia de la quinceañera",
  "Galería de fotografías",
  "Frase especial de la quinceañera",
  "Itinerario del evento",
  "Álbum digital post-evento",
  "Video principal",
  "Muro de mensajes de invitados",
  "Lista de regalos (opcional)",
  "Sección exclusiva personalizada",
];

export const plans = [
  {
    id: "sueno",
    name: "Sueño",
    description: "La esencia digital perfecta para compartir el gran día.",
    price: 397000,
    originalPrice: null,
    priceNote: "Precio único · Sin tiempo de expiración",
    featured: false,
    wompiUrl: "https://checkout.wompi.co/l/Dskp8h",
    featureCount: 7,
    features: [
      "Tarjeta digital personalizada",
      "Código QR para compartir",
      "Sitio web personalizado",
      "Confirmación de asistencia (RSVP)",
      "Ubicación con Google Maps",
      "Sección lluvia de sobres",
      "Dress code",
    ],
  },
  {
    id: "encanto",
    name: "Encanto",
    description: "Una experiencia inmersiva para contar su historia.",
    price: 597000,
    originalPrice: 897000,
    priceNote: null,
    featured: true,
    badge: "La favorita de las mamás",
    wompiUrl: "https://checkout.wompi.co/l/SKx8oX",
    featureCount: 13,
    features: [
      "Todo lo del paquete Sueño",
      "Música de bienvenida",
      "Historia de la quinceañera",
      "Galería de fotografías",
      "Frase especial de la quinceañera",
      "Itinerario del evento",
      "Álbum digital post-evento",
    ],
  },
  {
    id: "diamante",
    name: "Diamante",
    description: "La experiencia digital más exclusiva y personalizada.",
    price: 797000,
    originalPrice: 997000,
    priceNote: null,
    featured: false,
    badge: "Experiencia exclusiva",
    wompiUrl: "https://checkout.wompi.co/l/XGOxnU",
    featureCount: 17,
    features: [
      "Todo lo de Sueño + Encanto",
      "Video principal",
      "Muro de mensajes de invitados",
      "Lista de regalos (opcional)",
      "Sección exclusiva personalizada",
    ],
  },
];

// Qué paquetes incluyen cada feature del catálogo — para la tabla comparativa.
export const comparisonMatrix = {
  "Tarjeta digital personalizada": ["sueno", "encanto", "diamante"],
  "Código QR para compartir": ["sueno", "encanto", "diamante"],
  "Sitio web personalizado": ["sueno", "encanto", "diamante"],
  "Confirmación de asistencia (RSVP)": ["sueno", "encanto", "diamante"],
  "Ubicación con Google Maps": ["sueno", "encanto", "diamante"],
  "Sección lluvia de sobres": ["sueno", "encanto", "diamante"],
  "Dress code": ["sueno", "encanto", "diamante"],
  "Música de bienvenida": ["encanto", "diamante"],
  "Historia de la quinceañera": ["encanto", "diamante"],
  "Galería de fotografías": ["encanto", "diamante"],
  "Frase especial de la quinceañera": ["encanto", "diamante"],
  "Itinerario del evento": ["encanto", "diamante"],
  "Álbum digital post-evento": ["encanto", "diamante"],
  "Video principal": ["diamante"],
  "Muro de mensajes de invitados": ["diamante"],
  "Lista de regalos (opcional)": ["diamante"],
  "Sección exclusiva personalizada": ["diamante"],
};

export const themes = [
  {
    id: "acuatico",
    name: "Acuático",
    description: "Turquesa, ondas y frescura. La temática más popular.",
    image: "/thumbnails/acuatico.jpg",
    badge: "Más popular",
    demoUrl: "https://gobeapp.com/misquince/acua/index.html",
  },
  {
    id: "bosque",
    name: "Bosque Encantado",
    description: "Verdes naturales y un toque de magia, como un cuento de hadas.",
    image: "/thumbnails/bosque.jpg",
    demoUrl: "https://gobeapp.com/misquince/bosque/index.html",
  },
  {
    id: "pasaporte",
    name: "Pasaporte / Viaje",
    description: "Tonos cálidos y espíritu de aventura para la quinceañera trotamundos.",
    image: "/thumbnails/pasaporte.jpg",
    demoUrl: "http://www.pasaporteamis15.com",
  },
  {
    id: "premier",
    name: "Premier Elegante",
    description: "Púrpura, estrellas y un lujo clásico, sin límites.",
    image: "/thumbnails/premier.jpg",
    demoUrl: "https://gobeapp.com/misquince/isa/isa.html",
  },
];

export function formatCOP(amount) {
  return `$${amount.toLocaleString("es-CO")}`;
}
