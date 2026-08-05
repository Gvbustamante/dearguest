# Dear Guest — Landing page

Sitio web de una sola página para **Dear Guest**, experiencias digitales para
quinceañeras (sitios personalizados con fotos, música, RSVP y código QR).

Construido con **React + Vite**, en componentes reutilizables y con la
identidad de marca oficial:

- **Tipografía:** Playfair Display (títulos) + Poppins (cuerpo/UI)
- **Colores:** Borgoña `#6E1E33` · Verde Oliva `#6B7A3A` · Marfil `#FFFFF2` · Chocolate `#2E1B12`
- **Modo oscuro** incluido (tokens en `src/index.css`)

## Estructura

```
src/
  data/content.js       # precios, paquetes, temáticas, textos — fuente única de contenido
  components/
    icons.jsx           # íconos SVG reutilizables
    Button.jsx           # botón (primary/ghost)
    Header.jsx
    Hero.jsx + InviteCard.jsx
    Benefits.jsx + BenefitCard.jsx
    HowItWorks.jsx
    Pricing.jsx + PlanCard.jsx     # 3 paquetes, data-driven
    Themes.jsx + ThemeCard.jsx     # 4 temáticas, data-driven
    CTASection.jsx
    Footer.jsx
  App.jsx                # compone las secciones + animación de aparición al hacer scroll
  index.css              # tokens de marca + estilos globales
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/ listo para desplegar (Netlify, GitHub Pages, etc.)
npm run lint
```

Para actualizar precios, paquetes o temáticas, edita únicamente
`src/data/content.js` — todos los componentes se actualizan solos.
