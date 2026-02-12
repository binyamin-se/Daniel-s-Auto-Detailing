import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Gift Cards",
  description: "Gift premium mobile detailing with a simple inquiry and printable template.",
  path: "/gift-cards"
});

export default function GiftCardsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-semibold text-white">Gift Cards</h1>
      <p className="mt-3 max-w-3xl text-gray-300">
        Give a luxury detail experience. Perfect for birthdays, holidays, and client appreciation.
      </p>
      <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-2xl font-semibold text-white">Gift Card Inquiry</h2>
        <form className="mt-5 grid gap-3 sm:grid-cols-2">
          <input
            required
            placeholder="Your name"
            className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
          />
          <input
            required
            type="email"
            placeholder="Email"
            className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
          />
          <input
            required
            placeholder="Recipient name"
            className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
          />
          <input
            required
            placeholder="Gift value (e.g. $250)"
            className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
          />
          <textarea
            rows={4}
            placeholder="Message"
            className="sm:col-span-2 rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
          />
          <button className="rounded-full bg-accentBlue px-5 py-2 text-sm font-semibold text-white">Submit Inquiry</button>
        </form>
        <a href="#" className="mt-6 inline-block text-sm text-gray-300 underline">
          Download printable gift card template (placeholder)
        </a>
      </section>
      <CTASection />
    </div>
  );
}
