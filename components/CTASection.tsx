import Link from "next/link";
import { phoneDisplay, phoneHref } from "@/lib/content";

type CTASectionProps = {
  title?: string;
  description?: string;
};

export function CTASection({
  title = "Ready for a Showroom-Level Finish?",
  description = "We come to your home or workplace. Tell us your vehicle type and service goals, and we will confirm fast."
}: CTASectionProps) {
  return (
    <section className="mx-auto my-20 max-w-6xl px-4 sm:px-6">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-accentBlue/20 to-white/5 p-8 shadow-glass">
        <h2 className="text-3xl font-semibold text-white md:text-4xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-gray-200">{description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/book"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
          >
            Book Now
          </Link>
          <a
            href={phoneHref}
            className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white"
          >
            Call {phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
