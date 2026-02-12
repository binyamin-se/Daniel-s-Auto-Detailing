"use client";

import { motion } from "framer-motion";

type MotionRevealProps = {
  children: React.ReactNode;
};

export function MotionReveal({ children }: MotionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.div>
  );
}
