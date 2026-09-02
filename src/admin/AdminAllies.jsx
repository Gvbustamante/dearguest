import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import { slugifyReferralCode } from "../lib/referral.js";

const STATUSES = ["Pendiente", "Activo", "Inactivo"];

const EMPTY_FORM = { name: "", business_name: "", business_type: "", contact: "", notes: "" };

export default function AdminAllies() {
  const [allies, setAllies] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  async function load() {
    const { data, error: loadError } = await supabase.from("allies").select("*").order("created_at", { ascending: false });
    if (loadError) setError(loadError.message);
    else setAllies(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const { error: insertError } = await supabase.from("allies").insert({
      ...form,
      referral_code: slugifyReferralCode(form.business_name || form.name),
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
    await supabase.from("allies").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    load();
  }

  async function removeAlly(id) {
    if (!window.confirm("¿Eliminar este aliado? Los clientes que ya tenga referidos quedan sin aliado asignado.")) return;
    await supabase.from("allies").delete().eq("id", id);
    load();
  }

  function referralLink(code) {
    return `${window.location.origin}/?ref=${code}`;
  }

  async function copyLink(ally) {
    const link = referralLink(ally.referral_code);
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // Sin acceso al portapapeles — el link ya queda visible para copiar a mano.
    }
    setCopiedId(ally.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>Aliados</h2>
        <button type="button" className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancelar" : "+ Nuevo aliado"}
        </button>
      </div>
      <p className="admin-hint">
        Cada aliado recibe un link de referido único (se genera solo). Compártelo con él — cuando un cliente llegue por
        ese link queda anotado en su mensaje, y puedes marcarlo como referido de este aliado en Clientes.
      </p>

      {showForm && (
        <form className="admin-form" onSubmit={handleAdd}>
          <div className="admin-form-grid">
            <div className="cf-field">
              <label>Nombre</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="cf-field">
              <label>Negocio / marca</label>
              <input value={form.business_name} onChange={(e) => setForm({ ...form, business_name: e.target.value })} />
            </div>
            <div className="cf-field">
              <label>Tipo de negocio</label>
              <input value={form.business_type} onChange={(e) => setForm({ ...form, business_type: e.target.value })} />
            </div>
            <div className="cf-field">
              <label>WhatsApp o email</label>
              <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
            </div>
          </div>
          <div className="cf-field">
            <label>Notas</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Guardando…" : "Guardar aliado"}
          </button>
        </form>
      )}

      {allies === null ? (
        <p className="admin-empty">Cargando…</p>
      ) : allies.length === 0 ? (
        <p className="admin-empty">Todavía no hay aliados registrados.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Negocio</th>
                <th>Contacto</th>
                <th>Link de referido</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allies.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>
                    {a.business_name || "—"}
                    {a.business_type && <div className="admin-message-meta">{a.business_type}</div>}
                  </td>
                  <td>{a.contact || "—"}</td>
                  <td>
                    <button type="button" className="admin-link-btn admin-referral-link" onClick={() => copyLink(a)}>
                      {copiedId === a.id ? "¡Copiado!" : `?ref=${a.referral_code}`}
                    </button>
                  </td>
                  <td>
                    <select value={a.status} onChange={(e) => updateStatus(a.id, e.target.value)}>
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button type="button" className="admin-link-btn" onClick={() => removeAlly(a.id)}>
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
