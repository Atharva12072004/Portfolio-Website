// src/lib/utils/motion.ts
import { Variants } from "framer-motion";

export const staggerContainer = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0.2
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const textVariant = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      delay,
    },
  },
});
