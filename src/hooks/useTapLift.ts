import { useReducedMotion } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";

/**
 * Returns whileHover/whileTap props, or {} under prefers-reduced-motion so
 * transform-based feedback never fires for users who asked for less motion.
 */
export function useTapLift(hover?: TargetAndTransition, tap?: TargetAndTransition) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return {};
  const props: { whileHover?: TargetAndTransition; whileTap?: TargetAndTransition } = {};
  if (hover) props.whileHover = hover;
  if (tap) props.whileTap = tap;
  return props;
}
