import { useEffect } from "react";
import { gsap } from "gsap";

export const useHeroAnimation = (ref) => {
  useEffect(() => {
    if (!ref.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-copy]", {
        y: 56,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.15,
        ease: "power3.out",
        stagger: 0.1,
      });

      gsap.from("[data-hero-card]", {
        y: 72,
        opacity: 0,
        rotate: 1.2,
        filter: "blur(14px)",
        duration: 1.45,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.12,
      });
    }, ref);

    return () => ctx.revert();
  }, [ref]);
};



