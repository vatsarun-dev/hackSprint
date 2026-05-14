import { useEffect } from "react";
import { gsap } from "gsap";

export const usePageTransition = (ref) => {
  useEffect(() => {
    if (!ref.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        filter: "blur(12px)",
        y: 24,
        duration: 0.75,
        ease: "power3.out",
      });
    }, ref);

    return () => ctx.revert();
  }, [ref]);
};
