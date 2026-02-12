import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteWizard } from "@/components/QuoteWizard";
import { CTASection } from "@/components/CTASection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Quote Wizard",
  description: "Premium multi-step quote wizard for detailing, ceramic, tint, and memberships.",
  path: "/quote"
});

export default function QuotePage() {
  return (
    <>
      <Suspense fallback={<div className="px-4 py-20 text-white">Loading quote wizard...</div>}>
        <QuoteWizard />
      </Suspense>
      <CTASection title="Need Immediate Help?" description="Call now for same-day availability checks." />
    </>
  );
}
