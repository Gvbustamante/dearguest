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
];

export function blockLabel(type) {
  return SECTION_BLOCKS.find((b) => b.type === type)?.label ?? type;
}

export function blankContentFor(type) {
  const block = SECTION_BLOCKS.find((b) => b.type === type);
  const content = {};
  (block?.fields ?? []).forEach((field) => {
    if (field === "images") content[field] = [];
    else if (field === "imagePosition") content[field] = "right";
    else content[field] = "";
  });
  return content;
}
