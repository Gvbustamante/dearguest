import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";

const CATEGORIES = [
  { id: "quince", label: "Quinceañeras" },
  { id: "bodas", label: "Bodas" },
  { id: "bautizo", label: "Bautizo / Baby" },
  { id: "cumpleanos", label: "Cumpleaños" },
  { id: "renovacion", label: "Renovación de votos" },
];

const CURRENCIES = [
  { id: "cop", label: "Precios en COP" },
  { id: "usd", label: "Precios en USD" },
];

export default function AdminPlans() {
  const [plans, setPlans] = useState(null);
  const [category, setCategory] = useState("quince");
  const [savingId, setSavingId] = useState(null);
  const [savedId, setSavedId] = useState(null);

  async function load() {
    const { data } = await supabase.from("plans").select("*").order("category").order("currency").order("sort_order");
    setPlans(data ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  function updateField(id, field, value) {
    setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  async function save(plan) {
    setSavingId(plan.id);
    const { features, ...rest } = plan;
    await supabase
      .from("plans")
      .update({ ...rest, features, feature_count: features.length, updated_at: new Date().toISOString() })
      .eq("id", plan.id);
    setSavingId(null);
    setSavedId(plan.id);
    setTimeout(() => setSavedId(null), 1800);
  }

  if (plans === null) return <p className="admin-empty">Cargando…</p>;

  const inCategory = plans.filter((p) => p.category === category);

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>Paquetes y precios</h2>
        <div className="admin-page-toggle admin-category-toggle">
          {CATEGORIES.map((c) => (
            <button key={c.id} type="button" className={category === c.id ? "active" : ""} onClick={() => setCategory(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <p className="admin-viewing">
        Estás viendo: <strong>{CATEGORIES.find((c) => c.id === category)?.label}</strong> — {inCategory.length} paquete
        {inCategory.length === 1 ? "" : "s"} (COP y USD). Elige otra categoría arriba para ver esos paquetes.
      </p>
      <p className="admin-hint">
        Los cambios se reflejan en el sitio público al guardar. Solo los paquetes de Quinceañeras en COP tienen enlace de
        pago Wompi por ahora — en los demás, deja el link vacío y el botón del sitio lleva directo a tu WhatsApp mientras
        consigues otra pasarela.
      </p>

      {CURRENCIES.map((cur) => {
        const items = inCategory.filter((p) => p.currency === cur.id);
        if (items.length === 0) return null;
        return (
          <div key={cur.id} className="admin-currency-group">
            <h3>{cur.label}</h3>
            <div className="admin-plans-grid">
              {items.map((plan) => (
                <div className="admin-plan-card" key={plan.id}>
                  <span className="admin-plan-tag">
                    {CATEGORIES.find((c) => c.id === plan.category)?.label} · {plan.currency.toUpperCase()}
                  </span>
                  <div className="cf-field">
                    <label>Nombre</label>
                    <input value={plan.name} onChange={(e) => updateField(plan.id, "name", e.target.value)} />
                  </div>
                  <div className="cf-field">
                    <label>Descripción</label>
                    <textarea value={plan.description} onChange={(e) => updateField(plan.id, "description", e.target.value)} />
                  </div>
                  <div className="admin-form-grid">
                    <div className="cf-field">
                      <label>Precio ({plan.currency.toUpperCase()})</label>
                      <input
                        type="number"
                        value={plan.price}
                        onChange={(e) => updateField(plan.id, "price", Number(e.target.value))}
                      />
                    </div>
                    <div className="cf-field">
                      <label>Precio original (opcional)</label>
                      <input
                        type="number"
                        value={plan.original_price ?? ""}
                        onChange={(e) => updateField(plan.id, "original_price", e.target.value ? Number(e.target.value) : null)}
                      />
                    </div>
                  </div>
                  <div className="cf-field">
                    <label>Nota de precio (si no hay descuento)</label>
                    <input value={plan.price_note ?? ""} onChange={(e) => updateField(plan.id, "price_note", e.target.value)} />
                  </div>
                  <div className="cf-field">
                    <label>Insignia (ej. "Más solicitado")</label>
                    <input value={plan.badge ?? ""} onChange={(e) => updateField(plan.id, "badge", e.target.value)} />
                  </div>
                  <div className="cf-field">
                    <label>Link de pago (Wompi u otra pasarela)</label>
                    <input
                      value={plan.wompi_url ?? ""}
                      placeholder="Vacío = el botón lleva a WhatsApp"
                      onChange={(e) => updateField(plan.id, "wompi_url", e.target.value || null)}
                    />
                  </div>
                  <div className="cf-field">
                    <label>Funcionalidades (una por línea)</label>
                    <textarea
                      rows={6}
                      value={plan.features.join("\n")}
                      onChange={(e) => updateField(plan.id, "features", e.target.value.split("\n").filter(Boolean))}
                    />
                  </div>
                  <label className="admin-checkbox">
                    <input
                      type="checkbox"
                      checked={plan.featured}
                      onChange={(e) => updateField(plan.id, "featured", e.target.checked)}
                    />
                    Destacar como "más popular"
                  </label>
                  <button type="button" className="btn btn-primary" onClick={() => save(plan)} disabled={savingId === plan.id}>
                    {savingId === plan.id ? "Guardando…" : savedId === plan.id ? "Guardado ✓" : "Guardar cambios"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
