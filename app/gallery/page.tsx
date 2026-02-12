import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { CTASection } from "@/components/CTASection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Gallery",
  description: "Premium gallery of detailing, interior, ceramic, tint, and before/after results.",
  path: "/gallery"
});

export default function GalleryPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6">
        <h1 className="text-4xl font-semibold text-white">Results Gallery</h1>
        <p className="mt-3 max-w-3xl text-gray-300">
          Live examples across Mobile Auto Detailing, interiors, ceramic, and tint.
        </p>
      </div>
      <GalleryGrid />
      <CTASection />
    </>
  );
}
