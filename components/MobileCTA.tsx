"use client";

import Link from "next/link";
import { phoneHref } from "@/lib/content";

export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-charcoal/95 p-3 backdrop-blur-lg md:hidden">
      <div className="mx-auto grid max-w-xl grid-cols-3 gap-2">
        <a
          href={phoneHref}
          className="rounded-full border border-white/20 bg-white/5 px-3 py-3 text-center text-xs font-semibold text-light"
        >
          Call Now
        </a>
        <Link
          href="/quote"
          className="rounded-full bg-accentBlue px-3 py-3 text-center text-xs font-semibold text-white"
        >
          Get Quote
        </Link>
        <Link
          href="/membership"
          className="rounded-full border border-accentBlue/40 bg-accentBlue/15 px-3 py-3 text-center text-xs font-semibold text-blue-100"
        >
          Memberships
        </Link>
      </div>
    </div>
  );
}
