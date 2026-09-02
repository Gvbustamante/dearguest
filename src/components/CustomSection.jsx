// Renderiza una sección creada desde /admin > Secciones según su plantilla (type).

export default function CustomSection({ type, content }) {
  const c = content || {};

  if (type === "hero_image") {
    return (
      <section className="cs-hero" style={c.imageUrl ? { backgroundImage: `url(${c.imageUrl})` } : undefined}>
        <div className="cs-hero-overlay" aria-hidden="true" />
        <div className="container cs-hero-inner reveal">
          {c.title && <h2>{c.title}</h2>}
          {c.subtitle && <p>{c.subtitle}</p>}
          {c.buttonLabel && c.buttonHref && (
            <a className="btn btn-primary" href={c.buttonHref}>
              {c.buttonLabel}
            </a>
          )}
        </div>
      </section>
    );
  }

  if (type === "text_image") {
    return (
      <section>
        <div className={`container cs-text-image reveal${c.imagePosition === "left" ? " cs-img-left" : ""}`}>
          <div className="cs-text-image-text">
            {c.title && <h2>{c.title}</h2>}
            {c.body && <p>{c.body}</p>}
            {c.buttonLabel && c.buttonHref && (
              <a className="btn btn-ghost" href={c.buttonHref}>
                {c.buttonLabel}
              </a>
            )}
          </div>
          {c.imageUrl && <img className="cs-text-image-img" src={c.imageUrl} alt="" />}
        </div>
      </section>
    );
  }

  if (type === "text_block") {
    return (
      <section>
        <div className="container">
          <div className="section-head reveal">
            {c.eyebrow && <span className="eyebrow">{c.eyebrow}</span>}
            {c.title && <h2>{c.title}</h2>}
            {c.body && <p>{c.body}</p>}
          </div>
        </div>
      </section>
    );
  }

  if (type === "gallery") {
    const images = Array.isArray(c.images) ? c.images.filter(Boolean) : [];
    if (!images.length) return null;
    return (
      <section>
        <div className="container">
          {c.title && (
            <div className="section-head reveal">
              <h2>{c.title}</h2>
            </div>
          )}
          <div className="cs-gallery reveal">
            {images.map((src) => (
              <img key={src} src={src} alt="" loading="lazy" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "cta_banner") {
    return (
      <section className="cta">
        <div className="container">
          <div className="cta-inner reveal">
            {c.title && <h2>{c.title}</h2>}
            {c.body && <p>{c.body}</p>}
            {c.buttonLabel && c.buttonHref && (
              <a className="btn btn-primary" href={c.buttonHref}>
                {c.buttonLabel}
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  return null;
}
