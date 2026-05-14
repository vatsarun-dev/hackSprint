import { useEffect } from "react";
import { gsap } from "gsap";

export const usePageTransition = (ref) => {
  useEffect(() => {
    if (!ref.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        filter: "blur(14px)",
        y: 34,
        duration: 0.95,
        ease: "power3.out",
      });
    }, ref);

    return () => ctx.revert();
  }, [ref]);
};



