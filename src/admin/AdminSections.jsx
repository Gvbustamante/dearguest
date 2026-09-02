import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import { SECTION_BLOCKS, blankContentFor, blockLabel } from "../data/sectionBlocks.js";

const PAGES = [
  { id: "quince", label: "Quinceañeras" },
  { id: "bodas", label: "Bodas" },
];

const FIELD_LABELS = {
  title: "Título",
  subtitle: "Subtítulo",
  eyebrow: "Etiqueta pequeña",
  buttonLabel: "Texto del botón",
  buttonHref: "Enlace del botón (ej. #paquetes o https://...)",
};

async function uploadImage(file) {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `sections/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("site-assets").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
  return data.publicUrl;
}

export default function AdminSections() {
  const [page, setPage] = useState("quince");
  const [heroUrl, setHeroUrl] = useState(null);
  const [heroLoading, setHeroLoading] = useState(true);
  const [heroUploading, setHeroUploading] = useState(false);
  const [sections, setSections] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [pickingType, setPickingType] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setHeroLoading(true);
    setSections(null);
    setExpandedId(null);
    setPickingType(false);
    supabase
      .from("hero_settings")
      .select("image_url")
      .eq("page", page)
      .maybeSingle()
      .then(({ data }) => {
        if (active) {
          setHeroUrl(data?.image_url ?? null);
          setHeroLoading(false);
        }
      });
    supabase
      .from("page_sections")
      .select("*")
      .eq("page", page)
      .order("position", { ascending: true })
      .then(({ data }) => {
        if (active) setSections(data ?? []);
      });
    return () => {
      active = false;
    };
  }, [page]);

  async function handleHeroUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setHeroUploading(true);
    try {
      const url = await uploadImage(file);
      await supabase.from("hero_settings").upsert({ page, image_url: url, updated_at: new Date().toISOString() });
      setHeroUrl(url);
    } catch {
      setError("No se pudo subir la imagen. Intenta de nuevo.");
    }
    setHeroUploading(false);
    e.target.value = "";
  }

  async function removeHeroBg() {
    await supabase.from("hero_settings").upsert({ page, image_url: null, updated_at: new Date().toISOString() });
    setHeroUrl(null);
  }

  async function addSection(type) {
    const position = sections && sections.length > 0 ? Math.max(...sections.map((s) => s.position)) + 1 : 0;
    const { data, error: insErr } = await supabase
      .from("page_sections")
      .insert({ page, type, position, content: blankContentFor(type), visible: true })
      .select()
      .single();
    if (!insErr && data) {
      setSections((prev) => [...(prev ?? []), data]);
      setExpandedId(data.id);
    } else {
      setError("No se pudo crear la sección. Intenta de nuevo.");
    }
    setPickingType(false);
  }

  function updateContent(id, field, value) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, content: { ...s.content, [field]: value } } : s)));
  }

  async function saveSection(section) {
    await supabase
      .from("page_sections")
      .update({ content: section.content, updated_at: new Date().toISOString() })
      .eq("id", section.id);
  }

  async function toggleVisible(section) {
    const visible = !section.visible;
    setSections((prev) => prev.map((s) => (s.id === section.id ? { ...s, visible } : s)));
    await supabase.from("page_sections").update({ visible }).eq("id", section.id);
  }

  async function deleteSection(section) {
    if (!window.confirm("¿Eliminar esta sección? No se puede deshacer.")) return;
    await supabase.from("page_sections").delete().eq("id", section.id);
    setSections((prev) => prev.filter((s) => s.id !== section.id));
  }

  async function move(section, direction) {
    const ordered = [...sections].sort((a, b) => a.position - b.position);
    const index = ordered.findIndex((s) => s.id === section.id);
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= ordered.length) return;
    const other = ordered[swapIndex];
    const a = { ...section, position: other.position };
    const b = { ...other, position: section.position };
    setSections((prev) => prev.map((s) => (s.id === a.id ? a : s.id === b.id ? b : s)));
    await Promise.all([
      supabase.from("page_sections").update({ position: a.position }).eq("id", a.id),
      supabase.from("page_sections").update({ position: b.position }).eq("id", b.id),
    ]);
  }

  async function uploadFieldImage(section, field, file) {
    setError("");
    try {
      const url = await uploadImage(file);
      updateContent(section.id, field, url);
    } catch {
      setError("No se pudo subir la imagen. Intenta de nuevo.");
    }
  }

  async function addGalleryImage(section, file) {
    setError("");
    try {
      const url = await uploadImage(file);
      const images = [...(section.content.images || []), url];
      updateContent(section.id, "images", images);
    } catch {
      setError("No se pudo subir la imagen. Intenta de nuevo.");
    }
  }

  function removeGalleryImage(section, url) {
    const images = (section.content.images || []).filter((i) => i !== url);
    updateContent(section.id, "images", images);
  }

  const ordered = sections ? [...sections].sort((a, b) => a.position - b.position) : null;

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>Secciones y fondos</h2>
        <div className="admin-page-toggle">
          {PAGES.map((p) => (
            <button key={p.id} type="button" className={page === p.id ? "active" : ""} onClick={() => setPage(p.id)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <p className="admin-hint">
        Cambia el fondo del Hero y crea secciones nuevas para la página de {page === "bodas" ? "Bodas" : "Quinceañeras"}.
        Los cambios se ven en el sitio en cuanto guardas.
      </p>
      {error && <p className="admin-error">{error}</p>}

      <div className="admin-hero-bg">
        <h3>Fondo del Hero</h3>
        {heroLoading ? (
          <p className="admin-empty">Cargando…</p>
        ) : (
          <div className="admin-hero-bg-row">
            {heroUrl ? (
              <img src={heroUrl} alt="" className="admin-hero-bg-preview" />
            ) : (
              <div className="admin-hero-bg-preview admin-hero-bg-empty">Sin imagen — fondo ivory por defecto</div>
            )}
            <div className="admin-hero-bg-actions">
              <label className="btn btn-ghost admin-upload-btn">
                {heroUploading ? "Subiendo…" : heroUrl ? "Cambiar imagen" : "Subir imagen"}
                <input type="file" accept="image/*" hidden onChange={handleHeroUpload} disabled={heroUploading} />
              </label>
              {heroUrl && (
                <button type="button" className="admin-link-btn" onClick={removeHeroBg}>
                  Quitar fondo
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="admin-sections-head">
        <h3>Secciones personalizadas</h3>
        <button type="button" className="btn btn-primary" onClick={() => setPickingType((v) => !v)}>
          {pickingType ? "Cancelar" : "+ Nueva sección"}
        </button>
      </div>

      {pickingType && (
        <div className="admin-block-palette">
          {SECTION_BLOCKS.map((b) => (
            <button type="button" key={b.type} className="admin-block-option" onClick={() => addSection(b.type)}>
              <strong>{b.label}</strong>
              <span>{b.description}</span>
            </button>
          ))}
        </div>
      )}

      {ordered === null ? (
        <p className="admin-empty">Cargando…</p>
      ) : ordered.length === 0 ? (
        <p className="admin-empty">Todavía no has creado secciones para esta página.</p>
      ) : (
        <div className="admin-sections-list">
          {ordered.map((section, index) => (
            <div className={`admin-section-row${section.visible ? "" : " hidden"}`} key={section.id}>
              <div className="admin-section-row-head">
                <div>
                  <span className="admin-section-type">{blockLabel(section.type)}</span>
                  <strong>{section.content.title || section.content.eyebrow || "(sin título)"}</strong>
                  {!section.visible && <span className="admin-section-hidden-tag">Oculta</span>}
                </div>
                <div className="admin-section-row-actions">
                  <button type="button" className="admin-link-btn" onClick={() => move(section, -1)} disabled={index === 0}>
                    ↑
                  </button>
                  <button
                    type="button"
                    className="admin-link-btn"
                    onClick={() => move(section, 1)}
                    disabled={index === ordered.length - 1}
                  >
                    ↓
                  </button>
                  <button type="button" className="admin-link-btn" onClick={() => toggleVisible(section)}>
                    {section.visible ? "Ocultar" : "Mostrar"}
                  </button>
                  <button
                    type="button"
                    className="admin-link-btn"
                    onClick={() => setExpandedId(expandedId === section.id ? null : section.id)}
                  >
                    {expandedId === section.id ? "Cerrar" : "Editar"}
                  </button>
                  <button type="button" className="admin-link-btn" onClick={() => deleteSection(section)}>
                    Eliminar
                  </button>
                </div>
              </div>

              {expandedId === section.id && (
                <div className="admin-section-form">
                  {SECTION_BLOCKS.find((b) => b.type === section.type)?.fields.map((field) => (
                    <SectionField
                      key={field}
                      field={field}
                      section={section}
                      onChange={(value) => updateContent(section.id, field, value)}
                      onUploadImage={(file) => uploadFieldImage(section, field, file)}
                      onAddGalleryImage={(file) => addGalleryImage(section, file)}
                      onRemoveGalleryImage={(url) => removeGalleryImage(section, url)}
                    />
                  ))}
                  <button type="button" className="btn btn-primary" onClick={() => saveSection(section)}>
                    Guardar cambios
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionField({ field, section, onChange, onUploadImage, onAddGalleryImage, onRemoveGalleryImage }) {
  const value = section.content[field];

  if (field === "imageUrl") {
    return (
      <div className="cf-field">
        <label>Imagen</label>
        {value && <img src={value} alt="" className="admin-field-image-preview" />}
        <label className="btn btn-ghost admin-upload-btn">
          {value ? "Cambiar imagen" : "Subir imagen"}
          <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && onUploadImage(e.target.files[0])} />
        </label>
      </div>
    );
  }

  if (field === "images") {
    const images = Array.isArray(value) ? value : [];
    return (
      <div className="cf-field">
        <label>Imágenes de la galería</label>
        {images.length > 0 && (
          <div className="admin-gallery-grid">
            {images.map((url) => (
              <div className="admin-gallery-item" key={url}>
                <img src={url} alt="" />
                <button type="button" onClick={() => onRemoveGalleryImage(url)}>
                  Quitar
                </button>
              </div>
            ))}
          </div>
        )}
        <label className="btn btn-ghost admin-upload-btn">
          + Agregar imagen
          <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && onAddGalleryImage(e.target.files[0])} />
        </label>
      </div>
    );
  }

  if (field === "imagePosition") {
    return (
      <div className="cf-field">
        <label>Posición de la imagen</label>
        <select value={value || "right"} onChange={(e) => onChange(e.target.value)}>
          <option value="right">Derecha</option>
          <option value="left">Izquierda</option>
        </select>
      </div>
    );
  }

  if (field === "body") {
    return (
      <div className="cf-field">
        <label>Texto</label>
        <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }

  return (
    <div className="cf-field">
      <label>{FIELD_LABELS[field] || field}</label>
      <input value={value || ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
