import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppTop from "../components/AppTop.jsx";
import { supabase } from "../lib/supabase.js";
import { plans, formatCOP } from "../data/content.js";

const PRECIOS = Object.fromEntries(plans.map((p) => [p.name, p.price]));
const BADGE = {
  nueva: { cls: "badge-wine", label: "Nueva" },
  cerrada: { cls: "badge-green", label: "Cerrada ✓" },
  perdida: { cls: "badge-red", label: "Perdida" },
};

export default function AliadoDashboard() {
  const [params, setParams] = useSearchParams();
  const codigo = (params.get("codigo") || "").toUpperCase();
  const [inputCodigo, setInputCodigo] = useState(codigo);
  const [state, setState] = useState({ loading: !!codigo, data: null, error: "" });

  useEffect(() => {
    if (!codigo) return;
    setState({ loading: true, data: null, error: "" });
    supabase
      .rpc("dearguest_get_aliado_dashboard", { p_codigo: codigo })
      .then(({ data, error }) => {
        if (error || !data?.found) {
          setState({ loading: false, data: null, error: "Código no encontrado. Verifica que lo escribiste correctamente." });
        } else if (!data.activo) {
          setState({ loading: false, data: null, error: "Tu alianza está pendiente de aprobación. Te avisaremos por WhatsApp pronto." });
        } else {
          setState({ loading: false, data, error: "" });
        }
      });
  }, [codigo]);

  if (!codigo || state.error) {
    return (
      <div className="app-page">
        <AppTop />
        <div className="card">
          {state.error && <div className="alert alert-error">⚠️ {state.error}</div>}
          <div className="card-title">Acceder al Dashboard</div>
          <div className="card-sub">Ingresa tu código de aliado para ver tus referidos y comisiones</div>
          <div className="divider" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputCodigo.trim()) setParams({ codigo: inputCodigo.trim().toUpperCase() });
            }}
            style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
          >
            <input
              type="text"
              placeholder="Tu código (ej: ANDY1234)"
              value={inputCodigo}
              onChange={(e) => setInputCodigo(e.target.value)}
              style={{ flex: 1, minWidth: 180 }}
            />
            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (state.loading || !state.data) {
    return (
      <div className="app-page">
        <AppTop />
        <div className="card">Cargando...</div>
      </div>
    );
  }

  const referidos = state.data.referidos || [];
  const cerrados = referidos.filter((r) => r.estado_venta === "cerrada");
  const enProceso = referidos.filter((r) => (r.estado_venta || "nueva") === "nueva");
  const totalComision = cerrados.reduce(
    (sum, r) => sum + Math.round((PRECIOS[r.paquete] || 0) * (state.data.comision / 100)),
    0
  );
  const refLink = `${window.location.origin}/cotizar?ref=${codigo}`;

  return (
    <div className="app-page" style={{ maxWidth: 720 }}>
      <AppTop />

      <div className="card" style={{ background: "linear-gradient(135deg,var(--wine-soft) 0%,var(--paper) 70%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div className="card-title">Hola, {state.data.nombre.split(" ")[0]} 👋</div>
            <div className="card-sub" style={{ marginBottom: 0 }}>
              Comisión: <strong style={{ color: "var(--wine)" }}>{state.data.comision}%</strong>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: ".72rem", color: "var(--ink-soft)", marginBottom: 3 }}>Tu código</div>
            <span className="ref-code">{codigo}</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-n">{referidos.length}</div>
          <div className="stat-l">Referidos totales</div>
        </div>
        <div className="stat-card">
          <div className="stat-n">{cerrados.length}</div>
          <div className="stat-l">Ventas cerradas</div>
        </div>
        <div className="stat-card">
          <div className="stat-n" style={{ fontSize: "1.3rem" }}>
            ${formatCOP(totalComision)}
          </div>
          <div className="stat-l">Comisión ganada</div>
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: ".95rem", marginBottom: 4 }}>📎 Tu link de referido</div>
        <div style={{ fontSize: ".82rem", color: "var(--ink-soft)", marginBottom: 14 }}>
          Compártelo con tus clientes — cada cotización queda registrada a tu nombre
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span
            style={{
              background: "var(--wine-soft)",
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: "12px 14px",
              fontSize: ".82rem",
              wordBreak: "break-all",
              flex: 1,
            }}
          >
            {refLink}
          </span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => {
              navigator.clipboard.writeText(refLink);
              e.currentTarget.textContent = "¡Copiado ✓";
              setTimeout(() => (e.currentTarget.textContent = "Copiar link"), 2000);
            }}
          >
            Copiar link
          </button>
        </div>
        {enProceso.length > 0 && (
          <div className="alert alert-warn" style={{ marginTop: 14, marginBottom: 0 }}>
            ⏳ Tienes <strong>{enProceso.length}</strong> referido(s) en proceso — la comisión se confirma al cerrar la venta.
          </div>
        )}
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 16 }}>Mis referidos</div>
        {referidos.length === 0 ? (
          <div className="empty-state">
            <span className="icon">🔗</span>
            <p>
              Aún no tienes referidos.
              <br />
              Comparte tu link y tus comisiones aparecerán aquí.
            </p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Quinceañera</th>
                  <th>Paquete</th>
                  <th>Estado</th>
                  <th>Comisión</th>
                </tr>
              </thead>
              <tbody>
                {referidos.map((r) => {
                  const b = BADGE[r.estado_venta || "nueva"] || BADGE.nueva;
                  const precio = PRECIOS[r.paquete] || 0;
                  const com = Math.round(precio * (state.data.comision / 100));
                  return (
                    <tr key={r.id}>
                      <td style={{ whiteSpace: "nowrap" }}>{(r.created_at || "").slice(0, 10)}</td>
                      <td>{r.nombre_quinceanera || "—"}</td>
                      <td>{r.paquete ? <span className="badge badge-wine">{r.paquete}</span> : "—"}</td>
                      <td>
                        <span className={`badge ${b.cls}`}>{b.label}</span>
                      </td>
                      <td>
                        {r.estado_venta === "cerrada" ? (
                          <strong style={{ color: "#4c7038" }}>${formatCOP(com)}</strong>
                        ) : (
                          <span style={{ color: "var(--ink-soft)", fontSize: ".8rem" }}>Al cerrar</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
