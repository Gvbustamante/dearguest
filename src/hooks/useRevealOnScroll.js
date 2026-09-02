import { useEffect } from "react";

// Revela los elementos con .reveal (opacidad/traslación en index.css) a
// medida que entran en pantalla. Cualquier página que use la clase .reveal
// necesita este hook — sin él, esos elementos quedan invisibles para
// siempre (opacity: 0), como pasó en /alianzas.
export function useRevealOnScroll(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
