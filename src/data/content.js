// Fuente única de contenido — precios, textos, enlaces reales y temáticas del negocio Dear Guest.
// Mantener sincronizado con la Biblia del Negocio en Notion y con los links de pago de Wompi.

export const WHATSAPP_NUMBER = "573246102594";
export const INSTAGRAM_HANDLE = "gise.co_";
export const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/xppazlvn";
export const ADMIN_URL = "/admin";
// Página propia del Programa de Alianzas, dentro de este mismo proyecto.
export const ALLIES_URL = "/alianzas";

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

// ---------- Modo Bodas (toggle en la home) ----------
// Precios reales tomados de la propuesta comercial de bodas.
// Sin enlaces de pago Wompi todavía: el CTA es cotizar por WhatsApp.

export const weddingBenefits = [
  {
    title: "La emoción de recibir",
    body: "Una invitación que llega al celular y detiene el tiempo. Elegante, personalizada, inesperada.",
    icon: "heart",
  },
  {
    title: "La tranquilidad de organizar",
    body: "RSVP inteligente, sin grupos de WhatsApp caóticos. Sabes exactamente quién viene.",
    icon: "phone",
  },
  {
    title: "La ilusión de la espera",
    body: "Cuenta regresiva en tiempo real. Cada día que pasa, la emoción crece para todos.",
    icon: "clock",
  },
  {
    title: "El recuerdo permanente",
    body: "Tu sitio queda activo para siempre. El recuerdo digital que no se borra.",
    icon: "diamond",
  },
];

export const weddingSteps = [
  { title: "Eliges tu experiencia", body: "Seleccionas el plan que mejor se adapta a tu boda y presupuesto." },
  { title: "Compartes los detalles", body: "Nos envías colores, fotos, música favorita, historia de amor y datos del evento." },
  { title: "Diseñamos juntos", body: "Tu experiencia lista en 5 días hábiles con una ronda de ajustes incluida." },
  { title: "Apruebas y lanzas", body: "Recibes tu link único, listo para compartir con todos tus invitados." },
  { title: "El recuerdo permanece", body: "Tu sitio queda activo para siempre — el recuerdo digital que no se borra." },
];

export const weddingPlans = [
  {
    id: "eterno",
    name: "Eterno",
    tagline: "La esencia de tu gran día",
    price: 497000,
    featured: false,
    features: [
      "Invitación digital animada",
      "RSVP y confirmaciones",
      "Cuenta regresiva",
      "Información del evento",
      "Link de ubicación",
      "Paleta personalizada",
    ],
    excluded: ["Galería fotográfica", "Historia de la pareja", "Libro de firmas"],
  },
  {
    id: "nupcial",
    name: "Nupcial",
    tagline: "La experiencia completa",
    price: 797000,
    featured: true,
    badge: "Más solicitado",
    features: [
      "Todo lo de Eterno",
      "Galería fotográfica",
      "Historia de la pareja",
      "Música de fondo",
      "Mesa de regalos",
      "Dress code visual",
      "Panel de confirmaciones",
      "Programa del evento",
    ],
    excluded: ["Libro de firmas"],
  },
  {
    id: "grand-amour",
    name: "Grand Amour",
    tagline: "Experiencia sin límites",
    price: 1097000,
    featured: false,
    features: [
      "Todo lo de Nupcial",
      "Libro de firmas digital",
      "Trivia de la pareja",
      "Álbum post-boda",
      "Mapa con hoteles",
      "Agradecimientos",
      "Portada exclusiva",
      "Soporte 30 días",
      "Entrega prioritaria",
    ],
    excluded: [],
  },
];

export const weddingExtras = [
  { id: "bilingue", name: "Diseño bilingüe (ES + EN)", price: 80000 },
  { id: "qr-fisico", name: "QR físico para imprimir", price: 50000 },
  { id: "album-digital", name: "Álbum digital post-evento", price: 150000 },
  { id: "entrega-urgente", name: "Entrega urgente (menos de 48h)", price: 100000 },
];

// Arma el mensaje de WhatsApp con el resumen de la cotización de boda.
export function waWeddingQuoteMessage({ plan, extras, guests, total }) {
  const extrasText = extras.length ? extras.map((e) => `- ${e.name}`).join("\n") : "Ninguno";
  const guestsText = guests ? `${guests} invitados aprox.` : "Sin definir";
  return waLink(
    `Hola! Quiero cotizar mi boda con Dear Guest.\n\n` +
      `Paquete: ${plan.name} (${formatCOP(plan.price)})\n` +
      `Extras:\n${extrasText}\n` +
      `Invitados: ${guestsText}\n\n` +
      `Total estimado: ${formatCOP(total)}`
  );
}

// ---------- Programa de Alianzas (/alianzas) ----------

export const alliesAudience = [
  "Wedding & event planners",
  "Fotógrafos y videógrafos",
  "Decoradores y salones de eventos",
  "Maquilladoras y estilistas",
];

export const alliesBenefits = [
  {
    title: "Comisión por cada referido",
    body: "Ganas un porcentaje por cada quinceañera que llegue a Dear Guest gracias a tu recomendación.",
    icon: "heart",
  },
  {
    title: "Tu marca junto a la nuestra",
    body: "Material de marketing listo para compartir y menciones cruzadas con tus clientes potenciales.",
    icon: "phone",
  },
  {
    title: "Soporte prioritario",
    body: "Línea directa con nuestro equipo para resolver dudas y agilizar cada proyecto que refieras.",
    icon: "clock",
  },
];

export const alliesSteps = [
  { title: "Postúlate", body: "Cuéntanos sobre tu negocio y cómo trabajas con familias de quinceañeras." },
  { title: "Te contactamos", body: "En menos de 48 horas revisamos tu postulación y coordinamos una llamada." },
  { title: "Empieza a referir", body: "Comparte Dear Guest con tus clientes y gana por cada uno que se una." },
];

export const alliesBusinessTypes = [
  "Wedding & event planner",
  "Fotografía / video",
  "Decoración y salones de eventos",
  "Maquillaje y estilismo",
  "Otro",
];
