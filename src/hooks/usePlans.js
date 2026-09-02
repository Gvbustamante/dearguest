import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import { plans as staticPlans } from "../data/content.js";

function fromRow(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    originalPrice: row.original_price,
    priceNote: row.price_note,
    featured: row.featured,
    badge: row.badge,
    wompiUrl: row.wompi_url,
    features: row.features,
    category: row.category,
    currency: row.currency,
  };
}

// Lee los paquetes desde Supabase (editables en /admin), filtrados por
// categoría de evento (quince/bodas/bautizo/cumpleanos/renovacion) y moneda
// (cop/usd). Arranca con los datos estáticos de content.js para el combo por
// defecto (quince/cop) para que la página nunca se vea vacía mientras carga.
export function usePlans(category = "quince", currency = "cop") {
  const isDefault = category === "quince" && currency === "cop";
  const [plans, setPlans] = useState(isDefault ? staticPlans : []);

  useEffect(() => {
    let active = true;
    setPlans(category === "quince" && currency === "cop" ? staticPlans : []);
    supabase
      .from("plans")
      .select("*")
      .eq("category", category)
      .eq("currency", currency)
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (!active || error || !data || data.length === 0) return;
        setPlans(data.map(fromRow));
      });
    return () => {
      active = false;
    };
  }, [category, currency]);

  return plans;
}
