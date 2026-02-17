"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks, phoneDisplay, phoneHref } from "@/lib/content";
import { classNames } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-charcoal/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-semibold tracking-wide text-light">
            Daniel&apos;s <span className="text-accentBlue">Auto Detailing</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={classNames(
                "text-sm text-gray-300 transition hover:text-white",
                pathname === link.href && "text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={phoneHref} className="hidden text-sm text-gray-200 sm:block">
            {phoneDisplay}
          </a>
          <motion.div whileHover={{ y: -1.5 }}>
            <Link
              href="/book"
              className="relative overflow-hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-glass"
            >
              <span className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70 animate-shimmer" />
              <span className="relative">Book Now</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
