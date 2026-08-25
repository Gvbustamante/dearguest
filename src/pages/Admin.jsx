import { useEffect, useMemo, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { DiamondIcon, WhatsAppIcon } from "../components/icons.jsx";
import { supabase } from "../lib/supabase.js";
import { useAuth } from "../lib/useAuth.js";
import { plans, formatCOP } from "../data/content.js";

const PRECIOS = Object.fromEntries(plans.map((p) => [p.name, p.price]));

const TABS = [
  { id: "resumen", label: "📊 Resumen" },
  { id: "leads", label: "💬 Cotizaciones" },
  { id: "personalizacion", label: "🎨 Personalización" },
  { id: "post_evento", label: "⭐ Post-evento" },
  { id: "clientes", label: "👤 Clientes" },
  { id: "aliados", label: "💎 Aliados" },
  { id: "referidos", label: "🔗 Referidos" },
];

const ESTADO_BADGE = {
  nueva: "badge-wine",
  cerrada: "badge-green",
  perdida: "badge-red",
  pendiente: "badge-amber",
  activo: "badge-green",
  pausado: "badge-red",
};

function normalizeWa(raw) {
  const digits = String(raw || "").replace(/\D+/g, "");
  if (!digits || digits.length < 7) return "";
  return digits.length === 10 ? "57" + digits : digits;
}
function waLink(raw) {
  const d = normalizeWa(raw);
  return d ? `https://wa.me/${d}` : "";
}
function WaBtn({ value }) {
  const link = waLink(value);
  if (!link) return <span>{value || "—"}</span>;
  return (
    <a className="wa-btn" href={link} target="_blank" rel="noopener noreferrer">
      <WhatsAppIcon /> {value}
    </a>
  );
}

function downloadCSV(filename, rows, columns) {
  const header = columns.join(",");
  const body = rows
    .map((r) =>
      columns
        .map((c) => {
          const v = r[c] ?? "";
          const s = Array.isArray(v) ? v.join(" | ") : String(v);
          return `"${s.replace(/"/g, '""')}"`;
        })
        .join(",")
    )
    .join("\n");
  const blob = new Blob(["﻿" + header + "\n" + body], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function Admin() {
  const { session, loading } = useAuth();
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") || "resumen";

  const [leads, setLeads] = useState([]);
  const [personalizacion, setPersonalizacion] = useState([]);
  const [postEvento, setPostEvento] = useState([]);
  const [aliados, setAliados] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  async function reloadAll() {
    setDataLoading(true);
    const [l, p, pe, a] = await Promise.all([
      supabase.from("dearguest_leads").select("*").order("created_at", { ascending: false }),
      supabase.from("dearguest_personalizacion").select("*").order("created_at", { ascending: false }),
      supabase.from("dearguest_post_evento").select("*").order("created_at", { ascending: false }),
      supabase.from("dearguest_aliados").select("*").order("created_at", { ascending: false }),
    ]);
    setLeads(l.data || []);
    setPersonalizacion(p.data || []);
    setPostEvento(pe.data || []);
    setAliados(a.data || []);
    setDataLoading(false);
  }

  useEffect(() => {
    if (session) reloadAll();
  }, [session]);

  if (!loading && !session) return <Navigate to="/admin/login" replace />;
  if (loading || !session) return <div className="app-page">Cargando...</div>;

  async function logout() {
    await supabase.auth.signOut();
  }
  function setTab(t) {
    setParams({ tab: t });
    setSearch("");
  }

  const cotizaciones = leads.filter((l) => l.tipo === "cotizacion");
  const cerradas = cotizaciones.filter((l) => l.estado_venta === "cerrada");

  return (
    <div>
      <header className="admin-topbar">
        <span className="brand">
          <DiamondIcon className="brand-mark" style={{ width: 24, height: 24 }} />
          <span className="brand-name" style={{ fontSize: "1rem" }}>
            Dear Guest <span style={{ color: "var(--ink-soft)", fontWeight: 500, fontSize: ".82rem" }}>— Admin</span>
          </span>
        </span>
        <button className="app-back" onClick={logout} style={{ cursor: "pointer", background: "none" }}>
          Cerrar sesión
        </button>
      </header>

      <div className="app-page app-page--wide" style={{ paddingTop: 28 }}>
        <div className="tabs">
          {TABS.map((t) => (
            <button key={t.id} className={`tab-link${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {dataLoading ? (
          <div className="card">Cargando datos...</div>
        ) : tab === "resumen" ? (
          <Resumen leads={leads} cotizaciones={cotizaciones} cerradas={cerradas} personalizacion={personalizacion} aliados={aliados} />
        ) : tab === "leads" ? (
          <LeadsTab leads={leads} search={search} setSearch={setSearch} desde={desde} hasta={hasta} setDesde={setDesde} setHasta={setHasta} reload={reloadAll} />
        ) : tab === "personalizacion" ? (
          <PersonalizacionTab rows={personalizacion} search={search} setSearch={setSearch} reload={reloadAll} />
        ) : tab === "post_evento" ? (
          <PostEventoTab rows={postEvento} search={search} setSearch={setSearch} reload={reloadAll} />
        ) : tab === "clientes" ? (
          <ClientesTab leads={leads} personalizacion={personalizacion} postEvento={postEvento} search={search} setSearch={setSearch} />
        ) : tab === "aliados" ? (
          <AliadosTab rows={aliados} search={search} setSearch={setSearch} reload={reloadAll} />
        ) : (
          <ReferidosTab leads={leads} aliados={aliados} reload={reloadAll} />
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════ RESUMEN ═══════════════════════════════
function Resumen({ leads, cotizaciones, cerradas, personalizacion, aliados }) {
  const mesActual = new Date().toISOString().slice(0, 7);
  const cerradasMes = cerradas.filter((c) => (c.created_at || "").slice(0, 7) === mesActual);
  const ingresosMes = cerradasMes.reduce((s, c) => s + (PRECIOS[c.paquete] || 0), 0);
  const ingresosTotal = cerradas.reduce((s, c) => s + (PRECIOS[c.paquete] || 0), 0);
  const pipeline = cotizaciones
    .filter((c) => (c.estado_venta || "nueva") === "nueva")
    .reduce((s, c) => s + (PRECIOS[c.paquete] || 0), 0);
  const tasaConversion = cotizaciones.length ? Math.round((cerradas.length / cotizaciones.length) * 100) : 0;
  const aliadosActivos = aliados.filter((a) => a.estado === "activo").length;
  const aliadosPendientes = aliados.filter((a) => a.estado === "pendiente").length;

  const hoy = new Date().toISOString().slice(0, 10);
  const proximos = cerradas
    .filter((c) => c.fecha_evento && c.fecha_evento >= hoy)
    .sort((a, b) => a.fecha_evento.localeCompare(b.fecha_evento))
    .slice(0, 5);

  const actividad = [
    ...leads.map((l) => ({
      icono: l.tipo === "soporte" ? "🛟" : "💬",
      titulo: l.tipo === "soporte" ? "Mensaje de soporte" : "Cotización recibida",
      nombre: l.nombre_quinceanera || l.nombre,
      fecha: l.created_at,
    })),
    ...personalizacion.map((p) => ({ icono: "🎨", titulo: "Personalización enviada", nombre: p.nombre_quinceanera, fecha: p.created_at })),
  ]
    .sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""))
    .slice(0, 8);

  return (
    <>
      <div className="admin-header">
        <h1>Resumen del negocio</h1>
      </div>
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-l">Cotizaciones</div>
          <div className="kpi-n">{cotizaciones.length}</div>
          <div className="kpi-sub">{cotizaciones.filter((c) => (c.estado_venta || "nueva") === "nueva").length} en proceso</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-l">Tasa de conversión</div>
          <div className="kpi-n">{tasaConversion}%</div>
          <div className="kpi-sub">{cerradas.length} ventas cerradas</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-l">Ingresos este mes</div>
          <div className="kpi-n">${formatCOP(ingresosMes)}</div>
          <div className="kpi-sub">{cerradasMes.length} venta(s)</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-l">Ingresos confirmados</div>
          <div className="kpi-n">${formatCOP(ingresosTotal)}</div>
          <div className="kpi-sub">Histórico</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-l">Pipeline potencial</div>
          <div className="kpi-n">${formatCOP(pipeline)}</div>
          <div className="kpi-sub">Cotizaciones abiertas</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-l">Aliados</div>
          <div className="kpi-n">{aliadosActivos}</div>
          <div className="kpi-sub">{aliadosPendientes} pendiente(s)</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="dash-cols">
        <div>
          <div className="section-title">Próximos eventos</div>
          <div className="card">
            {proximos.length === 0 ? (
              <div className="empty-state">
                <span className="icon">📅</span>
                <p>No hay eventos confirmados próximamente.</p>
              </div>
            ) : (
              proximos.map((r) => {
                const dias = Math.round((new Date(r.fecha_evento) - new Date(hoy)) / 86400000);
                return (
                  <div key={r.id} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: "1px solid var(--line)" }}>
                    <div style={{ minWidth: 52, textAlign: "center", background: "var(--wine-soft)", color: "var(--wine)", borderRadius: 8, padding: "4px 2px", fontSize: ".68rem", fontWeight: 700 }}>
                      {dias}<br />días
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="td-name">{r.nombre_quinceanera}</div>
                      <div className="td-sub">
                        {r.ciudad} · {r.fecha_evento} · <span className="badge badge-wine">{r.paquete}</span>
                      </div>
                    </div>
                    <WaBtn value={r.whatsapp} />
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div>
          <div className="section-title">Actividad reciente</div>
          <div className="card">
            {actividad.length === 0 ? (
              <div className="empty-state">
                <span className="icon">🕐</span>
                <p>Sin actividad todavía.</p>
              </div>
            ) : (
              actividad.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--wine-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>{a.icono}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: ".84rem", fontWeight: 600 }}>{a.titulo}</div>
                    <div style={{ fontSize: ".76rem", color: "var(--ink-soft)" }}>{a.nombre || "—"}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════ helpers de tabla ═══════════════════════════════
function matchesSearch(row, search) {
  if (!search) return true;
  const blob = Object.values(row)
    .map((v) => (Array.isArray(v) ? v.join(" ") : String(v ?? "")))
    .join(" ")
    .toLowerCase();
  return blob.includes(search.toLowerCase());
}

async function deleteRow(table, id, reload) {
  if (!window.confirm("¿Eliminar este registro?")) return;
  await supabase.from(table).delete().eq("id", id);
  reload();
}

// ═══════════════════════════════ LEADS (cotización + soporte) ═══════════════════════════════
function LeadsTab({ leads, search, setSearch, desde, hasta, setDesde, setHasta, reload }) {
  const filtered = leads.filter((l) => matchesSearch(l, search));

  async function cambiarEstado(id, estado_venta) {
    await supabase.from("dearguest_leads").update({ estado_venta }).eq("id", id);
    reload();
  }

  function exportar() {
    const rows = leads.filter((l) => (!desde || l.created_at >= desde) && (!hasta || l.created_at <= hasta + "T23:59:59"));
    downloadCSV("cotizaciones.csv", rows, [
      "created_at", "tipo", "nombre", "nombre_quinceanera", "whatsapp", "ciudad", "fecha_evento", "tematica", "paquete", "mensaje", "fuente", "codigo_aliado", "estado_venta",
    ]);
  }

  return (
    <>
      <div className="admin-header">
        <h1>
          Cotizaciones y soporte <span className="count">({leads.length})</span>
        </h1>
        <div className="table-controls" style={{ marginBottom: 0 }}>
          <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
          <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
          <button className="btn btn-ghost btn-sm" onClick={exportar}>⬇ Exportar CSV</button>
        </div>
      </div>
      {leads.length === 0 ? (
        <div className="card"><div className="empty-state"><span className="icon">📭</span><p>Sin registros aún.</p></div></div>
      ) : (
        <>
          <div className="table-controls">
            <div className="table-search">
              <input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th><th>Tipo</th><th>Nombre</th><th>WhatsApp</th><th>Ciudad</th><th>Paquete</th><th>Estado</th><th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id}>
                    <td style={{ whiteSpace: "nowrap", fontSize: ".8rem", color: "var(--ink-soft)" }}>{(l.created_at || "").slice(0, 10)}</td>
                    <td><span className={`badge ${l.tipo === "soporte" ? "badge-amber" : "badge-wine"}`}>{l.tipo === "soporte" ? "Soporte" : "Cotización"}</span></td>
                    <td>
                      <div className="td-name">{l.nombre_quinceanera || l.nombre}</div>
                      {l.nombre_quinceanera && <div className="td-sub">Contacto: {l.nombre}</div>}
                      {l.mensaje && <div className="td-sub">{l.mensaje}</div>}
                    </td>
                    <td><WaBtn value={l.whatsapp} /></td>
                    <td>{l.ciudad || "—"}</td>
                    <td>{l.paquete ? <span className="badge badge-wine">{l.paquete}</span> : "—"}</td>
                    <td>
                      {l.tipo === "cotizacion" ? (
                        <select value={l.estado_venta || "nueva"} onChange={(e) => cambiarEstado(l.id, e.target.value)} style={{ width: "auto", fontSize: ".78rem", padding: "5px 8px" }}>
                          <option value="nueva">Nueva</option>
                          <option value="cerrada">Cerrada</option>
                          <option value="perdida">Perdida</option>
                        </select>
                      ) : "—"}
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteRow("dearguest_leads", l.id, reload)}>🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

// ═══════════════════════════════ PERSONALIZACIÓN ═══════════════════════════════
function PersonalizacionTab({ rows, search, setSearch, reload }) {
  const filtered = rows.filter((r) => matchesSearch(r, search));
  return (
    <>
      <div className="admin-header">
        <h1>Personalización <span className="count">({rows.length})</span></h1>
        <button className="btn btn-ghost btn-sm" onClick={() => downloadCSV("personalizacion.csv", rows, ["created_at","nombre_quinceanera","whatsapp","paquete","lugar","direccion","hora","historia","colores_tema","redes_evento","link_drive"])}>⬇ Exportar CSV</button>
      </div>
      {rows.length === 0 ? (
        <div className="card"><div className="empty-state"><span className="icon">📭</span><p>Sin registros aún.</p></div></div>
      ) : (
        <>
          <div className="table-controls"><div className="table-search"><input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} /></div></div>
          {filtered.map((r) => (
            <div key={r.id} className="card card--sm">
              <div className="client-head">
                <div>
                  <div className="client-name">{r.nombre_quinceanera}</div>
                  <div className="client-meta">{r.lugar} · {r.hora} · {r.paquete && <span className="badge badge-wine">{r.paquete}</span>}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <WaBtn value={r.whatsapp} />
                  <button className="btn btn-danger btn-sm" onClick={() => deleteRow("dearguest_personalizacion", r.id, reload)}>🗑</button>
                </div>
              </div>
              <div className="td-sub">Dirección: {r.direccion}</div>
              {r.historia && <div className="td-sub" style={{ marginTop: 6 }}>Historia: {r.historia}</div>}
              {r.colores_tema && <div className="td-sub">Colores/tema: {r.colores_tema}</div>}
              {r.link_drive && <div className="td-sub"><a href={r.link_drive} target="_blank" rel="noopener noreferrer">📁 Drive</a></div>}
              {Array.isArray(r.archivos) && r.archivos.length > 0 && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                  {r.archivos.map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="wa-btn" style={{ background: "var(--wine-soft)", color: "var(--wine)", borderColor: "var(--line)" }}>📎 foto {i + 1}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
}

// ═══════════════════════════════ POST-EVENTO ═══════════════════════════════
function PostEventoTab({ rows, search, setSearch, reload }) {
  const filtered = rows.filter((r) => matchesSearch(r, search));
  return (
    <>
      <div className="admin-header">
        <h1>Post-evento <span className="count">({rows.length})</span></h1>
        <button className="btn btn-ghost btn-sm" onClick={() => downloadCSV("post-evento.csv", rows, ["created_at","nombre","whatsapp","calificacion","testimonio","autoriza_testimonio","recomienda"])}>⬇ Exportar CSV</button>
      </div>
      {rows.length === 0 ? (
        <div className="card"><div className="empty-state"><span className="icon">📭</span><p>Sin registros aún.</p></div></div>
      ) : (
        <>
          <div className="table-controls"><div className="table-search"><input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} /></div></div>
          {filtered.map((r) => (
            <div key={r.id} className="card card--sm">
              <div className="client-head">
                <div>
                  <div className="client-name">{r.nombre} {"★".repeat(r.calificacion || 0)}</div>
                  <div className="client-meta">
                    {r.recomienda ? "✅ Recomienda" : "❌ No recomienda"} · {r.autoriza_testimonio ? "✅ Autoriza testimonio" : "❌ No autoriza"}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <WaBtn value={r.whatsapp} />
                  <button className="btn btn-danger btn-sm" onClick={() => deleteRow("dearguest_post_evento", r.id, reload)}>🗑</button>
                </div>
              </div>
              <div className="td-sub">{r.testimonio}</div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

// ═══════════════════════════════ ALIADOS ═══════════════════════════════
function AliadosTab({ rows, search, setSearch, reload }) {
  const filtered = rows.filter((r) => matchesSearch(r, search));

  async function aprobar(id, comision) {
    await supabase.from("dearguest_aliados").update({ estado: "activo", comision }).eq("id", id);
    reload();
  }
  async function pausar(id) {
    await supabase.from("dearguest_aliados").update({ estado: "pausado" }).eq("id", id);
    reload();
  }
  async function reactivar(id) {
    await supabase.from("dearguest_aliados").update({ estado: "activo" }).eq("id", id);
    reload();
  }

  return (
    <>
      <div className="admin-header">
        <h1>Aliados <span className="count">({rows.length})</span></h1>
      </div>
      {rows.length === 0 ? (
        <div className="card"><div className="empty-state"><span className="icon">💎</span><p>Sin aliados registrados aún.</p></div></div>
      ) : (
        <>
          <div className="table-controls"><div className="table-search"><input type="text" placeholder="Buscar aliado..." value={search} onChange={(e) => setSearch(e.target.value)} /></div></div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Fecha</th><th>Aliado</th><th>Contacto</th><th>Tipo</th><th>Código</th><th>Comisión</th><th>Estado</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id}>
                    <td style={{ whiteSpace: "nowrap", fontSize: ".8rem", color: "var(--ink-soft)" }}>{(a.created_at || "").slice(0, 10)}</td>
                    <td><div className="td-name">{a.nombre}</div><div className="td-sub">{a.empresa || "—"}</div></td>
                    <td><WaBtn value={a.whatsapp} /><div className="td-sub">{a.ciudad}</div></td>
                    <td className="td-sub">{a.tipo || "—"}</td>
                    <td><span className="ref-code">{a.codigo}</span></td>
                    <td><strong>{a.comision}%</strong></td>
                    <td><span className={`badge ${ESTADO_BADGE[a.estado] || "badge-gray"}`}>{a.estado}</span></td>
                    <td>
                      <div className="action-row">
                        {a.estado !== "activo" ? (
                          <button className="btn btn-sm" style={{ background: "rgba(90,130,70,.15)", color: "#4c7038" }} onClick={() => aprobar(a.id, a.comision || 10)}>Aprobar</button>
                        ) : (
                          <button className="btn btn-sm" style={{ background: "rgba(190,140,40,.15)", color: "#93701f" }} onClick={() => pausar(a.id)}>Pausar</button>
                        )}
                        {a.estado === "pausado" && (
                          <button className="btn btn-sm" style={{ background: "rgba(90,130,70,.15)", color: "#4c7038" }} onClick={() => reactivar(a.id)}>Reactivar</button>
                        )}
                        <button className="btn btn-danger btn-sm" onClick={() => deleteRow("dearguest_aliados", a.id, reload)}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

// ═══════════════════════════════ REFERIDOS ═══════════════════════════════
function ReferidosTab({ leads, aliados }) {
  const aliadosMap = useMemo(() => Object.fromEntries(aliados.map((a) => [a.codigo, a])), [aliados]);
  const referidos = leads.filter((l) => l.codigo_aliado);
  const totalComision = referidos.reduce((sum, r) => {
    if (r.estado_venta !== "cerrada") return sum;
    const ali = aliadosMap[r.codigo_aliado];
    const pct = ali ? ali.comision : 10;
    return sum + Math.round((PRECIOS[r.paquete] || 0) * (pct / 100));
  }, 0);

  return (
    <>
      <div className="admin-header">
        <h1>Referidos <span className="count">({referidos.length})</span></h1>
        <div className="badge badge-wine" style={{ padding: "8px 16px", fontSize: ".85rem" }}>
          Total comisiones: ${formatCOP(totalComision)}
        </div>
      </div>
      {referidos.length === 0 ? (
        <div className="card"><div className="empty-state"><span className="icon">🔗</span><p>Sin cotizaciones referidas aún.</p></div></div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Fecha</th><th>Aliado</th><th>Quinceañera</th><th>Paquete</th><th>Precio</th><th>Comisión</th><th>Estado</th></tr></thead>
            <tbody>
              {referidos.map((r) => {
                const ali = aliadosMap[r.codigo_aliado];
                const precio = PRECIOS[r.paquete] || 0;
                const pct = ali ? ali.comision : 10;
                const com = Math.round(precio * (pct / 100));
                return (
                  <tr key={r.id}>
                    <td style={{ whiteSpace: "nowrap", fontSize: ".8rem", color: "var(--ink-soft)" }}>{(r.created_at || "").slice(0, 10)}</td>
                    <td><div className="td-name">{ali?.nombre || r.codigo_aliado}</div><span className="ref-code">{r.codigo_aliado}</span></td>
                    <td>{r.nombre_quinceanera || "—"}</td>
                    <td>{r.paquete ? <span className="badge badge-wine">{r.paquete}</span> : "—"}</td>
                    <td>{precio ? `$${formatCOP(precio)}` : "—"}</td>
                    <td>{r.estado_venta === "cerrada" ? <strong style={{ color: "#4c7038" }}>${formatCOP(com)}</strong> : <span className="td-sub">Al cerrar</span>}</td>
                    <td><span className={`badge ${ESTADO_BADGE[r.estado_venta] || "badge-gray"}`}>{r.estado_venta}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════ CLIENTES 360 ═══════════════════════════════
function ClientesTab({ leads, personalizacion, postEvento, search, setSearch }) {
  const clientes = useMemo(() => {
    const map = {};
    const push = (wa, entry, tipo, campos) => {
      const key = normalizeWa(wa) || `sin-wa-${entry.id}`;
      if (!map[key]) map[key] = { whatsapp: wa, nombre: "", ciudad: "", paquete: "", estado_venta: "", codigo_aliado: "", etapas: {}, timeline: [], ultima: "" };
      const c = map[key];
      if (campos.nombre) c.nombre = campos.nombre;
      if (wa) c.whatsapp = wa;
      if (campos.ciudad) c.ciudad = campos.ciudad;
      if (campos.paquete) c.paquete = campos.paquete;
      if (campos.estado_venta) c.estado_venta = campos.estado_venta;
      if (campos.codigo_aliado) c.codigo_aliado = campos.codigo_aliado;
      c.etapas[tipo] = true;
      c.timeline.push({ tipo, fecha: entry.created_at });
      if ((entry.created_at || "") > c.ultima) c.ultima = entry.created_at;
    };
    leads.filter((l) => l.tipo === "cotizacion").forEach((l) =>
      push(l.whatsapp, l, "cotizacion", { nombre: l.nombre_quinceanera, ciudad: l.ciudad, paquete: l.paquete, estado_venta: l.estado_venta, codigo_aliado: l.codigo_aliado })
    );
    personalizacion.forEach((p) => push(p.whatsapp, p, "personalizacion", { nombre: p.nombre_quinceanera, paquete: p.paquete }));
    postEvento.forEach((p) => push(p.whatsapp, p, "post_evento", { nombre: p.nombre }));
    return Object.values(map).sort((a, b) => (b.ultima || "").localeCompare(a.ultima || ""));
  }, [leads, personalizacion, postEvento]);

  const filtered = clientes.filter((c) => matchesSearch(c, search));

  return (
    <>
      <div className="admin-header">
        <h1>Clientes <span className="count">({clientes.length})</span></h1>
      </div>
      <p style={{ color: "var(--ink-soft)", fontSize: ".85rem", margin: "-10px 0 18px" }}>
        Une automáticamente los formularios de un mismo cliente por WhatsApp.
      </p>
      {clientes.length === 0 ? (
        <div className="card"><div className="empty-state"><span className="icon">👤</span><p>Aún no hay clientes.</p></div></div>
      ) : (
        <>
          <div className="table-controls"><div className="table-search"><input type="text" placeholder="Buscar cliente..." value={search} onChange={(e) => setSearch(e.target.value)} /></div></div>
          {filtered.map((c, i) => (
            <div key={i} className="client-card">
              <div className="client-head">
                <div>
                  <div className="client-name">{c.nombre || "Sin nombre"}</div>
                  <div className="client-meta">
                    {c.ciudad || "—"}
                    {c.paquete && <> · <span className="badge badge-wine">{c.paquete}</span></>}
                    {c.estado_venta && <> · <span className={`badge ${ESTADO_BADGE[c.estado_venta] || "badge-gray"}`}>{c.estado_venta}</span></>}
                    {c.codigo_aliado && <> · Referido: <span className="ref-code">{c.codigo_aliado}</span></>}
                  </div>
                </div>
                <WaBtn value={c.whatsapp} />
              </div>
              <div className="stage-track">
                <span className={`stage-pill${c.etapas.cotizacion ? " done" : ""}`}>💬 Cotización</span>
                <span className={`stage-pill${c.etapas.personalizacion ? " done" : ""}`}>🎨 Personalización</span>
                <span className={`stage-pill${c.etapas.post_evento ? " done" : ""}`}>⭐ Post-evento</span>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
