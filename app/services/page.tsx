import type { Metadata } from "next";
import { detailingAddOns } from "@/lib/packages";
import { createPageMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";
import { CTASection } from "@/components/CTASection";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ServicesCompare } from "@/components/ServicesCompare";
import { ServiceAreaSection } from "@/components/ServiceAreaSection";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description: "Compare transparent mobile detailing packages, add-ons, and process details.",
  path: "/services"
});

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-semibold text-white">Mobile Auto Detailing Services & Packages</h1>
      <p className="mt-3 max-w-3xl text-gray-300">
        We come to your home or workplace with everything needed for premium results.
      </p>

      <ServicesCompare />

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-2xl font-semibold text-white">Add-ons</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {detailingAddOns.map((addon) => (
            <div key={addon.id} className="rounded-xl border border-white/10 bg-charcoal/50 p-4">
              <p className="font-medium text-white">{addon.name}</p>
              <p className="text-sm text-gray-300">+ {formatPrice(addon.price)}</p>
            </div>
          ))}
        </div>
      </section>

      <ProcessTimeline />
      <ServiceAreaSection />
      <CTASection />
    </div>
  );
}
