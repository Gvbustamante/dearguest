// Catálogo de plantillas de sección disponibles en el constructor de /admin > Secciones.
// Se comparte entre el panel (formularios de edición) y el sitio público (CustomSection.jsx).

export const SECTION_BLOCKS = [
  {
    type: "hero_image",
    label: "Banner con imagen",
    description: "Imagen de fondo a sangre completa con título, texto y botón.",
    fields: ["title", "subtitle", "imageUrl", "buttonLabel", "buttonHref"],
  },
  {
    type: "text_image",
    label: "Texto + imagen",
    description: "Bloque editorial de dos columnas: texto de un lado, imagen del otro.",
    fields: ["title", "body", "imageUrl", "imagePosition", "buttonLabel", "buttonHref"],
  },
  {
    type: "text_block",
    label: "Bloque de texto",
    description: "Título y texto centrados, sin imagen — para un mensaje o una cita.",
    fields: ["eyebrow", "title", "body"],
  },
  {
    type: "gallery",
    label: "Galería de imágenes",
    description: "Fila de fotos con un título opcional arriba.",
    fields: ["title", "images"],
  },
  {
    type: "cta_banner",
    label: "Banda de llamado a la acción",
    description: "Banda de color con título, texto y botón — como el CTA del sitio.",
    fields: ["title", "body", "buttonLabel", "buttonHref"],
  },
  {
    type: "testimonials",
    label: "Testimonios",
    description: "Clientes reales contando su experiencia — foto, nombre, evento y calificación.",
    fields: ["title", "testimonials"],
  },
  {
    type: "trust_badges",
    label: "Insignias de confianza",
    description: "Fila de sellos de seguridad, medios de pago o certificaciones, con un texto corto.",
    fields: ["title", "body", "badges"],
  },
  {
    type: "stats",
    label: "Estadísticas",
    description: "Números grandes con su etiqueta — para reforzar cifras en cualquier parte del sitio.",
    fields: ["title", "stats"],
  },
  {
    type: "logos_bar",
    label: "Logos / Prensa",
    description: "Fila de logos — medios, aliados o marcas que te han mencionado.",
    fields: ["title", "logos"],
  },
  {
    type: "team",
    label: "Equipo / Quiénes somos",
    description: "Foto, nombre, rol y una frase corta — para presentarte a ti o a tu equipo.",
    fields: ["title", "members"],
  },
  {
    type: "before_after",
    label: "Antes / Después",
    description: "Dos imágenes lado a lado con su etiqueta — ideal para 'invitación física vs. digital'.",
    fields: ["title", "beforeImage", "beforeLabel", "afterImage", "afterLabel"],
  },
  {
    type: "faq",
    label: "Preguntas frecuentes",
    description: "Lista de preguntas que se despliegan al hacer clic — resuelve dudas antes de que se vayan.",
    fields: ["title", "faqItems"],
  },
  {
    type: "video",
    label: "Video",
    description: "Un video incrustado (YouTube, Vimeo o archivo) con un texto corto debajo.",
    fields: ["title", "videoUrl", "body"],
  },
  {
    type: "urgency_bar",
    label: "Barra de urgencia",
    description: "Franja angosta con un mensaje corto y un botón — para cupos limitados o promociones.",
    fields: ["message", "buttonLabel", "buttonHref"],
  },
  {
    type: "feature_cards",
    label: "Imagen + título + texto",
    description: "Tarjetas repetibles: imagen arriba, título y texto corto debajo — para procesos, servicios o cualquier lista con foto.",
    fields: ["title", "cards"],
  },
];

// Campos que guardan una lista (de imágenes o de objetos) en vez de un texto simple.
const ARRAY_FIELDS = ["images", "testimonials", "badges", "stats", "logos", "members", "faqItems", "cards"];

export function blockLabel(type) {
  return SECTION_BLOCKS.find((b) => b.type === type)?.label ?? type;
}

export function blankContentFor(type) {
  const block = SECTION_BLOCKS.find((b) => b.type === type);
  const content = {};
  (block?.fields ?? []).forEach((field) => {
    if (ARRAY_FIELDS.includes(field)) content[field] = [];
    else if (field === "imagePosition") content[field] = "right";
    else content[field] = "";
  });
  return content;
}
