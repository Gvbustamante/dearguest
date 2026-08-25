import { createClient } from "@supabase/supabase-js";

// Estas dos variables se configuran en Netlify (Site settings → Environment
// variables) y en tu .env local (copia .env.example → .env). El "anon key"
// es público a propósito — la seguridad real vive en las políticas RLS de
// Supabase, no en ocultar esta llave.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.error(
    "Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Revisa tu archivo .env (local) o las variables de entorno del sitio en Netlify."
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
