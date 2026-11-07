import { useEffect, useState } from "react";

const SECTIONS = ["overview", "segments", "predict"];

export function useActiveSection() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.scrollY + 120;
      let current = "overview";

      for (const id of SECTIONS) {
        const element = document.getElementById(id);
        if (!element) continue;
        const top = element.getBoundingClientRect().top + window.scrollY;
        if (top <= line) current = id;
      }

      setActive((value) => (value === current ? value : current));
    };

    const requestMeasure = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);

    return () => {
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}
