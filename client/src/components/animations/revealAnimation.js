import { useEffect } from "react";
import { gsap } from "gsap";

export const useRevealAnimation = (ref) => {
  useEffect(() => {
    if (!ref.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        y: 48,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref]);
};



