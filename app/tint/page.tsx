import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { createPageMetadata } from "@/lib/seo";
import { tintPricing } from "@/lib/packages";

export const metadata: Metadata = createPageMetadata({
  title: "Window Tint",
  description: "Carbon and ceramic tint pricing with mobile-first booking flow.",
  path: "/tint"
});

const sections = [tintPricing.carbon, tintPricing.ceramic, tintPricing.windshield];

export default function TintPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-semibold text-white">Window Tint</h1>
      <p className="mt-4 max-w-3xl text-gray-300">Clean finish, cooler cabin, and premium protection with carbon or ceramic films.</p>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {sections.map((section) => (
          <article key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold text-white">{section.title}</h2>
            <div className="mt-4 space-y-2">
              {section.rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between border-b border-white/10 pb-2 text-sm">
                  <span className="text-gray-300">{row.label}</span>
                  <span className="font-semibold text-white">${row.price}</span>
                </div>
              ))}
            </div>
            {section.note ? <p className="mt-3 text-xs text-gray-400">{section.note}</p> : null}
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/quote?service=Tint" className="rounded-full bg-accentBlue px-6 py-3 text-sm font-semibold text-white">
          Get Tint Quote
        </Link>
      </div>
      <CTASection />
    </div>
  );
}
