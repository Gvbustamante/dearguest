// Fuente única de contenido — precios, textos, enlaces reales y temáticas del negocio Dear Guest.
// Mantener sincronizado con la Biblia del Negocio en Notion y con los links de pago de Wompi.

export const WHATSAPP_NUMBER = "573246102594";
export const INSTAGRAM_HANDLE = "gise.co_";
export const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/xppazlvn";
export const ADMIN_URL = "/admin";

export function waLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const trustStats = [
  { n: "+150", l: "Quinceañeras celebradas", lEn: "Quinceañeras celebrated" },
  { n: "8", l: "Temáticas exclusivas", lEn: "Exclusive themes" },
  { n: "100%", l: "Personalizado", lEn: "Personalized" },
  { n: "4.8 ★", l: "Valoración promedio", lEn: "Average rating" },
];

export const benefits = [
  {
    title: "Todo en un solo lugar",
    titleEn: "Everything in one place",
    body: "Fecha, ubicación, itinerario, música y galería — sin repetir la misma pregunta veinte veces.",
    bodyEn: "Date, location, itinerary, music and gallery — without answering the same question twenty times.",
    icon: "heart",
  },
  {
    title: "Se abre desde cualquier celular",
    titleEn: "Opens from any phone",
    body: "Escanean el QR con la cámara y ya. Sin apps, sin descargas — si un abuelo puede hacerlo, todos pueden.",
    bodyEn: "Scan the QR with the camera and that's it. No apps, no downloads — if grandpa can do it, everyone can.",
    icon: "phone",
  },
  {
    title: "Queda para siempre",
    titleEn: "It lasts forever",
    body: "No se pierde como una tarjeta física. El sitio y sus recuerdos siguen ahí mucho después de la fiesta.",
    bodyEn: "It won't get lost like a paper card. The site and its memories stay long after the party ends.",
    icon: "clock",
  },
];

export const steps = [
  {
    title: "Elige tu paquete",
    titleEn: "Choose your package",
    body: "Selecciona el paquete que más se adapta a lo que quieres y págalo en línea.",
    bodyEn: "Pick the package that fits what you want and pay online.",
  },
  {
    title: "Comparte tu info y temática",
    titleEn: "Share your info and theme",
    body: "Cuéntanos la temática, fotos, música y todos los detalles del evento de tu hija.",
    bodyEn: "Tell us the theme, photos, music and every detail of your daughter's event.",
  },
  {
    title: "Recibe tu sitio",
    titleEn: "Receive your site",
    body: "En 3 a 5 días hábiles, listo para revisar y aprobar.",
    bodyEn: "In 3 to 5 business days, ready for you to review and approve.",
  },
  {
    title: "Comparte el QR",
    titleEn: "Share the QR",
    body: "Tus invitados lo escanean y confirman asistencia al instante.",
    bodyEn: "Your guests scan it and confirm attendance instantly.",
  },
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
    name: "Dulce",
    description: "La esencia digital perfecta para compartir el gran día.",
    price: 379000,
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
      "Todo lo del paquete Dulce",
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
      "Todo lo de Dulce + Encanto",
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
    nameEn: "Aquatic",
    description: "Turquesa, ondas y frescura. La temática más popular.",
    descriptionEn: "Turquoise, waves and freshness. Our most popular theme.",
    image: "/thumbnails/acuatico.jpg",
    badge: "Más popular",
    badgeEn: "Most popular",
    demoUrl: "https://gobeapp.com/misquince/acua/index.html",
  },
  {
    id: "bosque",
    name: "Bosque Encantado",
    nameEn: "Enchanted Forest",
    description: "Verdes naturales y un toque de magia, como un cuento de hadas.",
    descriptionEn: "Natural greens with a touch of magic, like a fairy tale.",
    image: "/thumbnails/bosque.jpg",
    demoUrl: "https://gobeapp.com/misquince/bosque/index.html",
  },
  {
    id: "pasaporte",
    name: "Pasaporte / Viaje",
    nameEn: "Passport / Travel",
    description: "Tonos cálidos y espíritu de aventura para la quinceañera trotamundos.",
    descriptionEn: "Warm tones and adventure spirit for the globetrotting quinceañera.",
    image: "/thumbnails/pasaporte.jpg",
    demoUrl: "http://www.pasaporteamis15.com",
  },
  {
    id: "premier",
    name: "Premier Elegante",
    nameEn: "Premier Elegant",
    description: "Púrpura, estrellas y un lujo clásico, sin límites.",
    descriptionEn: "Purple, stars and classic luxury, without limits.",
    image: "/thumbnails/premier.jpg",
    demoUrl: "https://gobeapp.com/misquince/isa/isa.html",
  },
];

export function formatCOP(amount) {
  return `$${amount.toLocaleString("es-CO")}`;
}

export function formatUSD(amount) {
  return `$${amount.toLocaleString("en-US")}`;
}

export function formatPrice(amount, currency) {
  return currency === "usd" ? formatUSD(amount) : formatCOP(amount);
}

// Mensaje de WhatsApp genérico para paquetes que todavía no tienen enlace
// de pago (Wompi u otra pasarela) — se llena desde /admin más adelante.
export function waPlanQuoteMessage(plan, lang = "es") {
  const price = `${formatPrice(plan.price, plan.currency)} ${(plan.currency || "cop").toUpperCase()}`;
  return lang === "en"
    ? waLink(`Hi! I'd like to book the "${plan.name}" package (${price}) with Dear Guest.`)
    : waLink(`Hola! Quiero reservar el paquete "${plan.name}" (${price}) con Dear Guest.`);
}

// ---------- Modo Bodas (toggle en la home) ----------
// Precios reales tomados de la propuesta comercial de bodas.
// Sin enlaces de pago Wompi todavía: el CTA es cotizar por WhatsApp.

export const weddingBenefits = [
  {
    title: "La emoción de recibir",
    titleEn: "The joy of receiving it",
    body: "Una invitación que llega al celular y detiene el tiempo. Elegante, personalizada, inesperada.",
    bodyEn: "An invitation that arrives on your phone and stops time. Elegant, personal, unexpected.",
    icon: "heart",
  },
  {
    title: "La tranquilidad de organizar",
    titleEn: "The ease of organizing",
    body: "RSVP inteligente, sin grupos de WhatsApp caóticos. Sabes exactamente quién viene.",
    bodyEn: "Smart RSVP, no chaotic WhatsApp groups. You know exactly who's coming.",
    icon: "phone",
  },
  {
    title: "La ilusión de la espera",
    titleEn: "The thrill of the countdown",
    body: "Cuenta regresiva en tiempo real. Cada día que pasa, la emoción crece para todos.",
    bodyEn: "A live countdown. Every day that passes, the excitement grows for everyone.",
    icon: "clock",
  },
  {
    title: "El recuerdo permanente",
    titleEn: "The lasting memory",
    body: "Tu sitio queda activo para siempre. El recuerdo digital que no se borra.",
    bodyEn: "Your site stays live forever. The digital memory that never fades.",
    icon: "diamond",
  },
];

export const weddingSteps = [
  {
    title: "Eliges tu experiencia",
    titleEn: "Choose your experience",
    body: "Seleccionas el plan que mejor se adapta a tu boda y presupuesto.",
    bodyEn: "Pick the plan that best fits your wedding and budget.",
  },
  {
    title: "Compartes los detalles",
    titleEn: "Share the details",
    body: "Nos envías colores, fotos, música favorita, historia de amor y datos del evento.",
    bodyEn: "Send us colors, photos, favorite music, your love story and event details.",
  },
  {
    title: "Diseñamos juntos",
    titleEn: "We design together",
    body: "Tu experiencia lista en 5 días hábiles con una ronda de ajustes incluida.",
    bodyEn: "Your experience ready in 5 business days, with one round of edits included.",
  },
  {
    title: "Apruebas y lanzas",
    titleEn: "Approve and launch",
    body: "Recibes tu link único, listo para compartir con todos tus invitados.",
    bodyEn: "Get your unique link, ready to share with all your guests.",
  },
  {
    title: "El recuerdo permanece",
    titleEn: "The memory remains",
    body: "Tu sitio queda activo para siempre — el recuerdo digital que no se borra.",
    bodyEn: "Your site stays live forever — the digital memory that never fades.",
  },
];

// Los paquetes de boda ahora viven en Supabase (categoría "bodas", editables
// desde /admin), igual que los de quinceañeras — ver usePlans(category, currency).

export const weddingExtras = [
  { id: "bilingue", name: { es: "Diseño bilingüe (ES + EN)", en: "Bilingual design (ES + EN)" }, price: 80000, priceUsd: 80 },
  { id: "qr-fisico", name: { es: "QR físico para imprimir", en: "Printable physical QR" }, price: 50000, priceUsd: 50 },
  { id: "album-digital", name: { es: "Álbum digital post-evento", en: "Digital post-event album" }, price: 150000, priceUsd: 150 },
  { id: "entrega-urgente", name: { es: "Entrega urgente (menos de 48h)", en: "Rush delivery (under 48h)" }, price: 100000, priceUsd: 100 },
];

// Arma el mensaje de WhatsApp con el resumen de la cotización de boda.
export function waWeddingQuoteMessage({ plan, extras, guests, total, currency = "cop", lang = "es" }) {
  const price = (amount) => `${formatPrice(amount, currency)} ${currency.toUpperCase()}`;
  if (lang === "en") {
    const extrasText = extras.length ? extras.map((e) => `- ${e.name.en}`).join("\n") : "None";
    const guestsText = guests ? `~${guests} guests` : "Not defined yet";
    return waLink(
      `Hi! I'd like a quote for my wedding with Dear Guest.\n\n` +
        `Package: ${plan.name} (${price(plan.price)})\n` +
        `Extras:\n${extrasText}\n` +
        `Guests: ${guestsText}\n\n` +
        `Estimated total: ${price(total)}`
    );
  }
  const extrasText = extras.length ? extras.map((e) => `- ${e.name.es}`).join("\n") : "Ninguno";
  const guestsText = guests ? `${guests} invitados aprox.` : "Sin definir";
  return waLink(
    `Hola! Quiero cotizar mi boda con Dear Guest.\n\n` +
      `Paquete: ${plan.name} (${price(plan.price)})\n` +
      `Extras:\n${extrasText}\n` +
      `Invitados: ${guestsText}\n\n` +
      `Total estimado: ${price(total)}`
  );
}

// ---------- Programa de Alianzas (/alianzas) ----------

export const alliesAudience = [
  { es: "Wedding & event planners", en: "Wedding & event planners" },
  { es: "Fotógrafos y videógrafos", en: "Photographers & videographers" },
  { es: "Decoradores y salones de eventos", en: "Decorators & event venues" },
  { es: "Maquilladoras y estilistas", en: "Makeup artists & stylists" },
];

export const alliesBenefits = [
  {
    title: "Comisión por cada referido",
    titleEn: "Commission on every referral",
    body: "Ganas un porcentaje por cada quinceañera que llegue a Dear Guest gracias a tu recomendación.",
    bodyEn: "You earn a percentage for every quinceañera who joins Dear Guest through your recommendation.",
    icon: "heart",
  },
  {
    title: "Tu marca junto a la nuestra",
    titleEn: "Your brand alongside ours",
    body: "Material de marketing listo para compartir y menciones cruzadas con tus clientes potenciales.",
    bodyEn: "Ready-to-share marketing material and cross-promotion with your potential clients.",
    icon: "phone",
  },
  {
    title: "Soporte prioritario",
    titleEn: "Priority support",
    body: "Línea directa con nuestro equipo para resolver dudas y agilizar cada proyecto que refieras.",
    bodyEn: "A direct line to our team to solve doubts and speed up every project you refer.",
    icon: "clock",
  },
];

export const alliesSteps = [
  {
    title: "Postúlate",
    titleEn: "Apply",
    body: "Cuéntanos sobre tu negocio y cómo trabajas con familias de quinceañeras.",
    bodyEn: "Tell us about your business and how you work with quinceañera families.",
  },
  {
    title: "Te contactamos",
    titleEn: "We reach out",
    body: "En menos de 48 horas revisamos tu postulación y coordinamos una llamada.",
    bodyEn: "Within 48 hours we review your application and set up a call.",
  },
  {
    title: "Empieza a referir",
    titleEn: "Start referring",
    body: "Comparte Dear Guest con tus clientes y gana por cada uno que se una.",
    bodyEn: "Share Dear Guest with your clients and earn for every one who joins.",
  },
];

export const alliesBusinessTypes = [
  { es: "Wedding & event planner", en: "Wedding & event planner" },
  { es: "Fotografía / video", en: "Photography / video" },
  { es: "Decoración y salones de eventos", en: "Decoration & event venues" },
  { es: "Maquillaje y estilismo", en: "Makeup & styling" },
  { es: "Otro", en: "Other" },
];
