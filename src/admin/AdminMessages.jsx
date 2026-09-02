import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";

export default function AdminMessages() {
  const [messages, setMessages] = useState(null);

  async function load() {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setMessages(data ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(id, read) {
    await supabase.from("contact_messages").update({ read: !read }).eq("id", id);
    load();
  }

  async function remove(id) {
    if (!window.confirm("¿Eliminar este mensaje?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    load();
  }

  const unreadCount = messages?.filter((m) => !m.read).length ?? 0;

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>
          Mensajes de contacto
          {unreadCount > 0 && <span className="admin-badge">{unreadCount} sin leer</span>}
        </h2>
      </div>

      {messages === null ? (
        <p className="admin-empty">Cargando…</p>
      ) : messages.length === 0 ? (
        <p className="admin-empty">Todavía no han llegado mensajes por el formulario de contacto.</p>
      ) : (
        <div className="admin-messages">
          {messages.map((m) => (
            <div className={`admin-message-card${m.read ? "" : " unread"}`} key={m.id}>
              <div className="admin-message-top">
                <div>
                  <strong>{m.nombre}</strong> · {m.tipo_consulta}
                  <div className="admin-message-meta">
                    {m.contacto} · {new Date(m.created_at).toLocaleString("es-CO")}
                  </div>
                </div>
                <div className="admin-message-actions">
                  <button type="button" className="admin-link-btn" onClick={() => toggleRead(m.id, m.read)}>
                    {m.read ? "Marcar sin leer" : "Marcar leído"}
                  </button>
                  <button type="button" className="admin-link-btn" onClick={() => remove(m.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
              <p className="admin-message-body">{m.mensaje}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
