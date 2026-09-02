// Programa de Alianzas: código de referido por aliado, capturado desde
// ?ref=CODIGO en la URL y guardado en localStorage para que quede asociado
// al visitante mientras navega el sitio.

const STORAGE_KEY = "dg_ref_code";

export function captureReferralFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) localStorage.setItem(STORAGE_KEY, ref);
  } catch {
    // localStorage puede fallar en modo privado — no debe romper nada.
  }
}

export function getReferralCode() {
  try {
    return localStorage.getItem(STORAGE_KEY) || null;
  } catch {
    return null;
  }
}

// Agrega una nota con el código de referido al final de un mensaje, si hay uno guardado.
export function withReferralNote(message) {
  const ref = getReferralCode();
  return ref ? `${message}\n\nReferido por: ${ref}` : message;
}

// Genera un código de referido corto y legible a partir del nombre del negocio.
export function slugifyReferralCode(text) {
  const base = (text || "aliado")
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 20);
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base || "aliado"}-${suffix}`;
}
