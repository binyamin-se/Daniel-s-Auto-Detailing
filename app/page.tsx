import Link from "next/link";
import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/BentoGrid";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { PricingToggle } from "@/components/PricingToggle";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { GalleryGrid } from "@/components/GalleryGrid";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { ServiceAreaSection } from "@/components/ServiceAreaSection";
import { MembershipPreview } from "@/components/MembershipPreview";
import { SocialProofStrip } from "@/components/SocialProofStrip";
import { MotionReveal } from "@/components/MotionReveal";
import { ProcessTimeline } from "@/components/ProcessTimeline";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProofStrip />
      <MotionReveal>
        <BentoGrid />
      </MotionReveal>
      <MotionReveal>
        <BeforeAfterSlider
          beforeSrc="/images/clean/before-mercedes-foam-clean.jpeg"
          afterSrc="/images/clean/after-mercedes-clean-clean.jpeg"
        />
      </MotionReveal>
      <MotionReveal>
        <PricingToggle />
      </MotionReveal>
      <MotionReveal>
        <ProcessTimeline />
      </MotionReveal>
      <MotionReveal>
        <MembershipPreview />
      </MotionReveal>
      <MotionReveal>
        <ReviewsCarousel />
      </MotionReveal>
      <MotionReveal>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-accentBlue">Gallery</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Recent Results</h2>
            </div>
            <Link href="/gallery" className="text-sm text-gray-300 underline">
              View Full Gallery
            </Link>
          </div>
          <GalleryGrid limit={6} showFilters={false} />
        </section>
      </MotionReveal>
      <MotionReveal>
        <ServiceAreaSection />
      </MotionReveal>
      <MotionReveal>
        <FAQ />
      </MotionReveal>
      <MotionReveal>
        <CTASection />
      </MotionReveal>
    </>
  );
}
