"use client";

import Link from "next/link";
import { useState } from "react";
import { GlobalQuoteModal } from "@/components/GlobalQuoteModal";
import { phoneHref, textHref } from "@/lib/content";

export function StickyConversionBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-white/10 bg-charcoal/95 p-2 backdrop-blur-xl">
        <div className="mx-auto grid max-w-5xl grid-cols-4 gap-2">
          <a href={phoneHref} className="rounded-full border border-white/20 px-3 py-2 text-center text-xs text-white">
            Call
          </a>
          <a href={textHref} className="rounded-full border border-white/20 px-3 py-2 text-center text-xs text-white">
            Text
          </a>
          <button onClick={() => setOpen(true)} className="rounded-full bg-accentRed px-3 py-2 text-xs font-semibold text-white">
            Get Quote
          </button>
          <Link href="/quote" className="rounded-full bg-accentBlue px-3 py-2 text-center text-xs font-semibold text-white">
            Book
          </Link>
        </div>
      </div>
      <GlobalQuoteModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
