"use client";

import { useState } from "react";
import { faqItems } from "@/lib/content";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <p className="text-xs uppercase tracking-[0.18em] text-accentBlue">FAQ</p>
      <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">What to Expect</h2>
      <div className="mt-8 space-y-3">
        {faqItems.map((item, i) => (
          <article key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <button
              onClick={() => setOpen((current) => (current === i ? null : i))}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="font-medium text-white">{item.q}</span>
              <span className="text-gray-300">{open === i ? "−" : "+"}</span>
            </button>
            {open === i ? <p className="mt-3 text-sm text-gray-300">{item.a}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
