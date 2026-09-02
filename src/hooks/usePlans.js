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
  };
}

// Lee los paquetes desde Supabase (editables en /admin). Arranca con los
// datos estáticos de content.js para que la página nunca se vea vacía
// mientras carga, y los reemplaza en cuanto llega la respuesta real.
export function usePlans() {
  const [plans, setPlans] = useState(staticPlans);

  useEffect(() => {
    let active = true;
    supabase
      .from("plans")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (!active || error || !data || data.length === 0) return;
        setPlans(data.map(fromRow));
      });
    return () => {
      active = false;
    };
  }, []);

  return plans;
}
