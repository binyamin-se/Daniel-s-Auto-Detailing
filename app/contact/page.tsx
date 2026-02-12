import type { Metadata } from "next";
import { emailAddress, phoneDisplay, phoneHref, textHref } from "@/lib/content";
import { CTASection } from "@/components/CTASection";
import { ContactForm } from "@/components/ContactForm";
import { ServiceAreaSection } from "@/components/ServiceAreaSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: "Contact Dani's Auto Detail for mobile service and quotes.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-semibold text-white">Contact</h1>
      <p className="mt-3 max-w-3xl text-gray-300">
        We come to your home or workplace throughout the local metro area.
      </p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-semibold text-white">Reach Out</h2>
          <p className="mt-3 text-sm text-gray-300">Phone: <a href={phoneHref}>{phoneDisplay}</a></p>
          <p className="mt-2 text-sm text-gray-300">Text: <a href={textHref}>{phoneDisplay}</a></p>
          <p className="mt-2 text-sm text-gray-300">Email: <a href={`mailto:${emailAddress}`}>{emailAddress}</a></p>
          <p className="mt-2 text-sm text-gray-300">Hours: Mon-Sat 8:00 AM - 7:00 PM</p>
          <p className="mt-2 text-sm text-gray-300">No fixed storefront. We come to you.</p>
          <iframe
            title="Service area map"
            className="mt-5 h-52 w-full rounded-xl border border-white/10"
            src="https://www.google.com/maps?q=Washington%2C%20DC&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-semibold text-white">Request Contact</h2>
          <ContactForm />
        </section>
      </div>
      <ServiceAreaSection />
      <CTASection />
    </div>
  );
}
