import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";

const STATUSES = [
  "Nuevo lead",
  "Contactado",
  "Pago pendiente",
  "Confirmado",
  "Pendiente de contenido",
  "En producción",
  "Revisión",
  "Entregado",
  "Postventa",
  "Finalizado",
];

const EMPTY_FORM = {
  name: "",
  event_type: "Quinceañera",
  package: "",
  event_date: "",
  phone: "",
  email: "",
  notes: "",
  ally_id: "",
};

export default function AdminClients() {
  const [clients, setClients] = useState(null);
  const [allies, setAllies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const { data, error: loadError } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
    if (loadError) setError(loadError.message);
    else setClients(data);
  }

  useEffect(() => {
    load();
    supabase
      .from("allies")
      .select("id, name, business_name")
      .order("name", { ascending: true })
      .then(({ data }) => setAllies(data ?? []));
  }, []);

  async function handleAdd(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const { error: insertError } = await supabase.from("clients").insert({
      ...form,
      event_date: form.event_date || null,
      ally_id: form.ally_id || null,
    });
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setForm(EMPTY_FORM);
    setShowForm(false);
    load();
  }

  async function updateStatus(id, status) {
    await supabase.from("clients").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    load();
  }

  async function updateAlly(id, allyId) {
    await supabase
      .from("clients")
      .update({ ally_id: allyId || null, updated_at: new Date().toISOString() })
      .eq("id", id);
    load();
  }

  async function removeClient(id) {
    if (!window.confirm("¿Eliminar este cliente?")) return;
    await supabase.from("clients").delete().eq("id", id);
    load();
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>Clientes / Eventos</h2>
        <button type="button" className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancelar" : "+ Nuevo cliente"}
        </button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={handleAdd}>
          <div className="admin-form-grid">
            <div className="cf-field">
              <label>Nombre</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="cf-field">
              <label>Tipo de evento</label>
              <input
                required
                placeholder="Quinceañera, boda, cumpleaños…"
                value={form.event_type}
                onChange={(e) => setForm({ ...form, event_type: e.target.value })}
              />
            </div>
            <div className="cf-field">
              <label>Paquete</label>
              <input
                placeholder="Sueño / Encanto / Diamante"
                value={form.package}
                onChange={(e) => setForm({ ...form, package: e.target.value })}
              />
            </div>
            <div className="cf-field">
              <label>Fecha del evento</label>
              <input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} />
            </div>
            <div className="cf-field">
              <label>WhatsApp</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="cf-field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="cf-field">
              <label>Referido por (opcional)</label>
              <select value={form.ally_id} onChange={(e) => setForm({ ...form, ally_id: e.target.value })}>
                <option value="">Ninguno</option>
                {allies.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                    {a.business_name ? ` — ${a.business_name}` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="cf-field">
            <label>Notas</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Guardando…" : "Guardar cliente"}
          </button>
        </form>
      )}

      {clients === null ? (
        <p className="admin-empty">Cargando…</p>
      ) : clients.length === 0 ? (
        <p className="admin-empty">Todavía no hay clientes registrados.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Evento</th>
                <th>Paquete</th>
                <th>Fecha</th>
                <th>Contacto</th>
                <th>Referido por</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.event_type}</td>
                  <td>{c.package || "—"}</td>
                  <td>{c.event_date || "—"}</td>
                  <td>
                    {c.phone && <div>{c.phone}</div>}
                    {c.email && <div>{c.email}</div>}
                  </td>
                  <td>
                    <select value={c.ally_id ?? ""} onChange={(e) => updateAlly(c.id, e.target.value)}>
                      <option value="">Ninguno</option>
                      {allies.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name}
                          {a.business_name ? ` — ${a.business_name}` : ""}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select value={c.status} onChange={(e) => updateStatus(c.id, e.target.value)}>
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button type="button" className="admin-link-btn" onClick={() => removeClient(c.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
