import { useEffect, useRef } from "react";

/** Fade/slide-in quando o elemento entra na viewport. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          setTimeout(() => el.classList.add("is-in"), delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}

/** Tilt 3D no hover. intensity: graus máximos de rotação. */
export function useTilt<T extends HTMLElement = HTMLDivElement>(intensity = 8) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (ev: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      el.style.transition = "transform .12s ease-out, box-shadow .3s";
      el.style.transform = `perspective(900px) rotateX(${(-y * intensity).toFixed(2)}deg) rotateY(${(x * intensity).toFixed(2)}deg) translateY(-4px)`;
      el.style.boxShadow = "0 30px 60px -24px rgba(23,26,30,0.35)";
    };
    const leave = () => {
      el.style.transition = "transform .6s cubic-bezier(.2,.6,.2,1), box-shadow .6s";
      el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
      el.style.boxShadow = "none";
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [intensity]);
  return ref;
}

/** Contador animado (easing cúbico) disparado ao entrar na tela. */
export function useCounter(target: number, opts?: { decimal?: boolean; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || done) return;
        done = true;
        io.disconnect();
        const t0 = performance.now();
        const dur = opts?.duration ?? 1600;
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          const e = 1 - Math.pow(1 - p, 3);
          const v = target * e;
          el.textContent = opts?.decimal
            ? (v / 10).toFixed(1).replace(".", ",")
            : Math.round(v).toLocaleString("pt-BR");
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, opts?.decimal, opts?.duration]);
  return ref;
}

/** Parallax vertical: speed positivo = mais lento que o scroll. */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed: number) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const loop = () => {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.translate = `0 ${(-center * speed).toFixed(1)}px`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [speed]);
  return ref;
}

/** Progresso 0..1 de um wrapper pinado (position: sticky dentro dele). */
export function usePinProgress<T extends HTMLElement = HTMLElement>(
  onProgress: (p: number) => void
) {
  const ref = useRef<T>(null);
  const cb = useRef(onProgress);
  cb.current = onProgress;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const loop = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      cb.current(p);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return ref;
}
