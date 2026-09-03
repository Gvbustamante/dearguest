// Renderiza una sección creada desde /admin > Secciones según su plantilla (type).

import { useState } from "react";
import { StarIcon, ChevronIcon, PlayIcon } from "./icons.jsx";

function StarRow({ rating }) {
  const lit = Math.round(Number(rating) || 0);
  if (!lit) return null;
  return (
    <div className="cs-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className={i < lit ? "cs-star cs-star-lit" : "cs-star"} />
      ))}
    </div>
  );
}

function toEmbedUrl(url) {
  if (!url) return null;
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

export default function CustomSection({ type, content }) {
  const c = content || {};
  // Solo se usa en type === "faq", pero los hooks siempre se llaman en el mismo orden.
  const [openFaq, setOpenFaq] = useState(null);

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

  if (type === "testimonials") {
    const items = Array.isArray(c.testimonials) ? c.testimonials.filter((t) => t && (t.quote || t.name)) : [];
    if (!items.length) return null;
    return (
      <section>
        <div className="container">
          {c.title && (
            <div className="section-head reveal">
              <h2>{c.title}</h2>
            </div>
          )}
          <div className="cs-testimonials reveal">
            {items.map((t, i) => (
              <div className="cs-testimonial" key={i}>
                {t.photo && <img className="cs-testimonial-photo" src={t.photo} alt="" />}
                <StarRow rating={t.rating} />
                {t.quote && <p className="cs-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>}
                {(t.name || t.event) && (
                  <div className="cs-testimonial-who">
                    {t.name && <strong>{t.name}</strong>}
                    {t.event && <span>{t.event}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "trust_badges") {
    const badges = Array.isArray(c.badges) ? c.badges.filter((b) => b && (b.imageUrl || b.label)) : [];
    if (!badges.length) return null;
    return (
      <section>
        <div className="container">
          <div className="cs-badges-head reveal">
            {c.title && <h2>{c.title}</h2>}
            {c.body && <p>{c.body}</p>}
          </div>
          <div className="cs-badges reveal">
            {badges.map((b, i) => (
              <div className="cs-badge" key={i}>
                {b.imageUrl && <img src={b.imageUrl} alt="" />}
                {b.label && <span>{b.label}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "stats") {
    const stats = Array.isArray(c.stats) ? c.stats.filter((s) => s && (s.number || s.label)) : [];
    if (!stats.length) return null;
    return (
      <section>
        <div className="container">
          {c.title && (
            <div className="section-head reveal">
              <h2>{c.title}</h2>
            </div>
          )}
          <div className="cs-stats reveal">
            {stats.map((s, i) => (
              <div className="cs-stat" key={i}>
                <div className="cs-stat-n">{s.number}</div>
                <div className="cs-stat-l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "logos_bar") {
    const logos = Array.isArray(c.logos) ? c.logos.filter((l) => l && (l.imageUrl || l.name)) : [];
    if (!logos.length) return null;
    return (
      <section>
        <div className="container">
          {c.title && (
            <div className="section-head reveal">
              <h2>{c.title}</h2>
            </div>
          )}
          <div className="cs-logos reveal">
            {logos.map((l, i) => (
              <div className="cs-logo" key={i}>
                {l.imageUrl ? <img src={l.imageUrl} alt={l.name || ""} /> : <span>{l.name}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "team") {
    const members = Array.isArray(c.members) ? c.members.filter((m) => m && (m.name || m.photo)) : [];
    if (!members.length) return null;
    return (
      <section>
        <div className="container">
          {c.title && (
            <div className="section-head reveal">
              <h2>{c.title}</h2>
            </div>
          )}
          <div className="cs-team reveal">
            {members.map((m, i) => (
              <div className="cs-team-member" key={i}>
                {m.photo && <img className="cs-team-photo" src={m.photo} alt="" />}
                {m.name && <h3>{m.name}</h3>}
                {m.role && <span className="cs-team-role">{m.role}</span>}
                {m.bio && <p>{m.bio}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "before_after") {
    if (!c.beforeImage && !c.afterImage) return null;
    return (
      <section>
        <div className="container">
          {c.title && (
            <div className="section-head reveal">
              <h2>{c.title}</h2>
            </div>
          )}
          <div className="cs-before-after reveal">
            <div className="cs-ba-col">
              {c.beforeImage && <img src={c.beforeImage} alt="" />}
              {c.beforeLabel && <span>{c.beforeLabel}</span>}
            </div>
            <div className="cs-ba-col">
              {c.afterImage && <img src={c.afterImage} alt="" />}
              {c.afterLabel && <span>{c.afterLabel}</span>}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (type === "faq") {
    const items = Array.isArray(c.faqItems) ? c.faqItems.filter((f) => f && f.question) : [];
    if (!items.length) return null;
    return (
      <section>
        <div className="container">
          {c.title && (
            <div className="section-head reveal">
              <h2>{c.title}</h2>
            </div>
          )}
          <div className="cs-faq reveal">
            {items.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div className={`cs-faq-item${isOpen ? " open" : ""}`} key={i}>
                  <button type="button" className="cs-faq-q" onClick={() => setOpenFaq(isOpen ? null : i)} aria-expanded={isOpen}>
                    <span>{f.question}</span>
                    <ChevronIcon className="cs-faq-chevron" />
                  </button>
                  {isOpen && f.answer && <p className="cs-faq-a">{f.answer}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (type === "video") {
    if (!c.videoUrl) return null;
    const isFile = /\.(mp4|webm|ogg)(\?.*)?$/i.test(c.videoUrl);
    const embed = !isFile ? toEmbedUrl(c.videoUrl) : null;
    return (
      <section>
        <div className="container">
          {c.title && (
            <div className="section-head reveal">
              <h2>{c.title}</h2>
            </div>
          )}
          <div className="cs-video-frame reveal">
            {isFile ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video src={c.videoUrl} controls />
            ) : embed ? (
              <iframe
                src={embed}
                title={c.title || "Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <a className="cs-video-fallback" href={c.videoUrl} target="_blank" rel="noreferrer">
                <PlayIcon /> Ver video
              </a>
            )}
          </div>
          {c.body && <p className="cs-video-caption reveal">{c.body}</p>}
        </div>
      </section>
    );
  }

  if (type === "urgency_bar") {
    if (!c.message) return null;
    return (
      <section className="cs-urgency">
        <div className="container cs-urgency-inner reveal">
          <span>{c.message}</span>
          {c.buttonLabel && c.buttonHref && (
            <a className="btn btn-primary" href={c.buttonHref}>
              {c.buttonLabel}
            </a>
          )}
        </div>
      </section>
    );
  }

  if (type === "feature_cards") {
    const cards = Array.isArray(c.cards) ? c.cards.filter((card) => card && (card.title || card.imageUrl)) : [];
    if (!cards.length) return null;
    return (
      <section>
        <div className="container">
          {c.title && (
            <div className="section-head reveal">
              <h2>{c.title}</h2>
            </div>
          )}
          <div className="cs-feature-cards reveal">
            {cards.map((card, i) => (
              <div className="cs-feature-card" key={i}>
                {card.imageUrl && <img src={card.imageUrl} alt="" />}
                {card.title && <h3>{card.title}</h3>}
                {card.body && <p>{card.body}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
}
