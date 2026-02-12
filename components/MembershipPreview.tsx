import Link from "next/link";

export function MembershipPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-accentBlue/20 to-white/[0.03] p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accentBlue">Memberships</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Weekly Wash Memberships</h2>
            <p className="mt-3 max-w-2xl text-gray-200">
              Mobile weekly washes (4 washes per month). We come to your home or workplace and keep your car consistently clean.
            </p>
          </div>
          <Link href="/membership" className="rounded-full bg-accentBlue px-5 py-3 text-sm font-semibold text-white">
            Explore Memberships
          </Link>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-charcoal/40 p-4">
            <p className="text-sm text-accentBlue">Starter</p>
            <p className="mt-2 text-sm text-gray-200">Weekly exterior refresh for daily drivers.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-charcoal/40 p-4">
            <p className="text-sm text-accentBlue">Premium</p>
            <p className="mt-2 text-sm text-gray-200">Most popular weekly detail maintenance plan.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-charcoal/40 p-4">
            <p className="text-sm text-accentBlue">Elite</p>
            <p className="mt-2 text-sm text-gray-200">Concierge finish with priority scheduling.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
