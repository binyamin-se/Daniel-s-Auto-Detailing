import type { Metadata } from "next";
import Link from "next/link";
import { reviews } from "@/lib/content";
import { CTASection } from "@/components/CTASection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Reviews",
  description: "Customer feedback for mobile detailing, ceramic coating, and tint services.",
  path: "/reviews"
});

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-semibold text-white">Client Reviews</h1>
      <p className="mt-3 max-w-3xl text-gray-300">Consistent quality creates repeat clients and referrals.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-accentBlue">{"\u2605".repeat(review.rating)}</p>
            <p className="mt-3 text-gray-200">&quot;{review.text}&quot;</p>
            <p className="mt-4 text-sm font-semibold text-white">{review.name}</p>
            <p className="text-xs text-gray-400">{review.service}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/quote" className="rounded-full bg-accentBlue px-5 py-2 text-sm text-white">
          Get Quote
        </Link>
        <button className="rounded-full border border-white/20 px-5 py-2 text-sm text-gray-200">Leave a Review</button>
      </div>
      <CTASection />
    </div>
  );
}
