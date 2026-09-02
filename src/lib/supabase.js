import { createClient } from "@supabase/supabase-js";

// Claves públicas (publishable/anon) — están hechas para vivir en el bundle del
// cliente. El acceso real está controlado por las políticas RLS en Supabase,
// no por mantener esta clave en secreto. Se pueden sobreescribir con variables
// de entorno de Vite si algún día se necesita apuntar a otro proyecto.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://ytxhdqonncsvzpszzqub.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_HV663sIPkyi6-4esY8tbTg_soQ_WlEx";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
