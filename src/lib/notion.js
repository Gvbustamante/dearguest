import { supabase } from "./supabase.js";

/**
 * Sincroniza un registro a Notion vía la Edge Function dearguest-notion-sync.
 * Nunca lanza error hacia el llamador — si Notion falla, el dato ya quedó
 * guardado en Supabase de todas formas; el sync es "mejor esfuerzo", igual
 * que en el sistema anterior.
 */
export async function syncToNotion(table, record) {
  try {
    await supabase.functions.invoke("dearguest-notion-sync", {
      body: { table, record },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[notion sync] no se pudo sincronizar:", err);
  }
}
