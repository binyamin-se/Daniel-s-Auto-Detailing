"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { phoneHref, primaryCity, trustChips } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/70" />
      <motion.div
        initial={{ opacity: 0.3, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4 }}
        className="absolute inset-x-0 top-10 mx-auto h-72 w-72 rounded-full bg-hero-glow blur-3xl sm:h-96 sm:w-96"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:pb-28 lg:pt-32">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-flex rounded-full border border-accentBlue/40 bg-accentBlue/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-blue-100">
              Mobile Service
            </p>
            <p className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gray-300">
              4.9{"\u2605"} Google Rated
            </p>
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-6xl">
            Premium Mobile Detailing. Showroom Finish. Delivered.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-gray-200">
            We come to your home or workplace across {primaryCity} and surrounding areas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="relative overflow-hidden rounded-full bg-white px-7 py-3 text-sm font-semibold text-black"
            >
              <span className="absolute inset-y-0 left-0 w-20 animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <span className="relative">Book Now</span>
            </Link>
            <a
              href={phoneHref}
              className="rounded-full border border-white/30 bg-white/5 px-7 py-3 text-sm font-semibold text-white"
            >
              Call Now
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {trustChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-gray-200"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
