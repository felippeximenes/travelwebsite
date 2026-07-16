import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT } from "../../lib/motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(12px)", transition: { duration: 0.35, ease: EASE_OUT } },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE_OUT } },
};

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduceMotion ? reducedVariants : variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
