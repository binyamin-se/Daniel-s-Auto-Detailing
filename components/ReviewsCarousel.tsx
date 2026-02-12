"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { reviews } from "@/lib/content";

export function ReviewsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  const visible = [0, 1, 2].map((offset) => reviews[(index + offset) % reviews.length]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-accentBlue">Social Proof</p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Trusted by Owners Who Care</h2>
        </div>
        <Link href="/reviews" className="text-sm text-gray-300 underline">
          See all reviews
        </Link>
      </div>
      <AnimatePresence mode="popLayout">
        <div className="grid gap-4 md:grid-cols-3" key={index}>
          {visible.map((review) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-sm text-accentBlue">{"★".repeat(review.rating)}</p>
              <p className="mt-4 text-gray-200">&quot;{review.text}&quot;</p>
              <p className="mt-5 text-sm font-medium text-white">{review.name}</p>
              <p className="text-xs text-gray-400">{review.service}</p>
            </motion.article>
          ))}
        </div>
      </AnimatePresence>
    </section>
  );
}
