import { useEffect } from "react";
import { gsap } from "gsap";

export const useHeroAnimation = (ref) => {
  useEffect(() => {
    if (!ref.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-copy]", { y: 40, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12 });
      gsap.from("[data-hero-card]", { y: 50, opacity: 0, duration: 1.2, ease: "power3.out", stagger: 0.14, delay: 0.15 });
    }, ref);

    return () => ctx.revert();
  }, [ref]);
};
