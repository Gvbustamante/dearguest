import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";

// Fondo de imagen del Hero, editable por modo (quince/bodas) desde /admin > Secciones.
export function useHeroBackground(page) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("hero_settings")
      .select("image_url")
      .eq("page", page)
      .maybeSingle()
      .then(({ data }) => {
        if (active) setImageUrl(data?.image_url ?? null);
      });
    return () => {
      active = false;
    };
  }, [page]);

  return imageUrl;
}
