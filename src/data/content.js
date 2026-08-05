// Fuente única de contenido — precios, textos y temáticas del negocio Dear Guest.
// Mantener sincronizado con la Biblia del Negocio en Notion.

export const WHATSAPP_NUMBER = "573246102594";
export const INSTAGRAM_HANDLE = "dearguest";

export function waLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

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
  { title: "Cuéntanos de ella", body: "Nombre, fecha, ciudad y el paquete que más se acomoda." },
  { title: "Elige temática", body: "Acuático, Bosque Encantado, Pasaporte o Premier Elegante." },
  { title: "Envía fotos y música", body: "Nosotras nos encargamos de todo el diseño y la personalización." },
  { title: "Recibe tu sitio", body: "En 3 a 5 días hábiles, listo para revisar y aprobar." },
  { title: "Comparte el QR", body: "Tus invitados lo escanean y confirman asistencia al instante." },
];

export const plans = [
  {
    id: "sueno",
    name: "Sueño",
    description: "Lo esencial, con estilo — para quien quiere algo especial pero sencillo.",
    price: 379000,
    featured: false,
    features: [
      "Sitio web personalizado",
      "Tarjeta digital + código QR",
      "Confirmación de asistencia (RSVP)",
      "Ubicación con mapa y dress code",
    ],
  },
  {
    id: "encanto",
    name: "Encanto",
    description: "La favorita de las mamás — más historia, más música, más recuerdo.",
    price: 597000,
    featured: true,
    features: [
      "Todo lo de Sueño",
      "Música de bienvenida",
      "Historia + galería de fotos",
      "Itinerario + álbum post-evento",
    ],
  },
  {
    id: "diamante",
    name: "Diamante",
    description: "La experiencia completa — sin límites, con cada detalle personalizado.",
    price: 797000,
    featured: false,
    features: [
      "Todo lo de Encanto",
      "Video principal",
      "Muro de mensajes de invitados",
      "Lista de regalos + sección exclusiva",
    ],
  },
];

export const themes = [
  {
    id: "acuatico",
    name: "Acuático",
    description: "Turquesa, ondas y frescura. La temática más popular.",
    gradient: "linear-gradient(135deg,#89D9EF,#4BB8D4)",
    demoUrl: "http://gobeapp.com/misquince/acua/index.html",
  },
  {
    id: "bosque",
    name: "Bosque Encantado",
    description: "Verdes naturales y un toque de magia, como un cuento de hadas.",
    gradient: "linear-gradient(135deg,#8DD4A0,#5A9E6F)",
    demoUrl: "http://gobeapp.com/misquince/bosque/index.html",
  },
  {
    id: "pasaporte",
    name: "Pasaporte / Viaje",
    description: "Tonos cálidos y espíritu de aventura para la quinceañera trotamundos.",
    gradient: "linear-gradient(135deg,#F0BC8A,#C47A45)",
    demoUrl: "http://www.pasaporteamis15.com",
  },
  {
    id: "premier",
    name: "Premier Elegante",
    description: "Púrpura, estrellas y un lujo clásico, sin límites.",
    gradient: "linear-gradient(135deg,#CCA0E0,#8B5BA6)",
    demoUrl: "http://gobeapp.com/misquince/isa/isa.html",
  },
];

export function formatCOP(amount) {
  return amount.toLocaleString("es-CO");
}
