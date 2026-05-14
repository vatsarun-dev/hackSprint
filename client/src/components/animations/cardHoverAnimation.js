import { useEffect } from "react";
import { gsap } from "gsap";

export const useCardHoverAnimation = (ref) => {
  useEffect(() => {
    if (!ref.current) return undefined;

    const element = ref.current;
    const enter = () => gsap.to(element, { y: -6, duration: 0.3, ease: "power2.out" });
    const leave = () => gsap.to(element, { y: 0, duration: 0.3, ease: "power2.out" });

    element.addEventListener("mouseenter", enter);
    element.addEventListener("mouseleave", leave);

    return () => {
      element.removeEventListener("mouseenter", enter);
      element.removeEventListener("mouseleave", leave);
    };
  }, [ref]);
};



