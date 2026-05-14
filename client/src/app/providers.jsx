import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { store } from "../redux/store";
import { initializeAuth } from "../redux/slices/authSlice";
import { initializeTheme } from "../redux/slices/uiSlice";

gsap.registerPlugin(ScrollTrigger);

const AppLifecycle = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  useEffect(() => {
    dispatch(initializeAuth());
    dispatch(initializeTheme());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };

    const frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return children;
};

export const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <AppLifecycle>{children}</AppLifecycle>
    </Provider>
  );
};
