import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";

// Secciones personalizadas creadas desde /admin > Secciones, para el modo dado.
export function useSections(page) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    let active = true;
    supabase
      .from("page_sections")
      .select("*")
      .eq("page", page)
      .eq("visible", true)
      .order("position", { ascending: true })
      .then(({ data }) => {
        if (active) setSections(data ?? []);
      });
    return () => {
      active = false;
    };
  }, [page]);

  return sections;
}
