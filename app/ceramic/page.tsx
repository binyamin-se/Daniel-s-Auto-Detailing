import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { ceramicOffering } from "@/lib/packages";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Ceramic Coating",
  description: "3-year ceramic coating protection with hydrophobic gloss and paint defense.",
  path: "/ceramic"
});

export default function CeramicPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-semibold text-white">{ceramicOffering.title}</h1>
      <p className="mt-4 max-w-3xl text-gray-300">
        Professional ceramic application designed for long-term gloss, easier maintenance, and paint preservation.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {ceramicOffering.features.map((feature) => (
          <article key={feature} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-gray-200">{feature}</p>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/quote?service=Ceramic" className="rounded-full bg-accentBlue px-6 py-3 text-sm font-semibold text-white">
          Get a Quote
        </Link>
      </div>
      <CTASection />
    </div>
  );
}
