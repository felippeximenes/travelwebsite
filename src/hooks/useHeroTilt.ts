import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { MouseEvent } from "react";

export function useHeroTilt() {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(rawX, { stiffness: 120, damping: 14 });
  const rotateX = useSpring(rawY, { stiffness: 120, damping: 14 });

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    rawX.set(Math.max(-1, Math.min(1, relX)) * 5);
    rawY.set(Math.max(-1, Math.min(1, -relY)) * 5);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}
