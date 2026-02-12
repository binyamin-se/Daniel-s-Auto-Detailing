export function MembershipHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-accentBlue/20 via-transparent to-accentRed/10" />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6">
        <p className="inline-flex rounded-full border border-accentBlue/40 bg-accentBlue/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-blue-100">
          Mobile Memberships
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold text-white md:text-6xl">
          Weekly Wash Memberships - Stay Clean All Month
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-gray-200">
          We come to you. Pick a plan. We keep your car fresh every week.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => document.getElementById("membership-plans")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full bg-accentBlue px-6 py-3 text-sm font-semibold text-white"
          >
            Join Now
          </button>
          <a href="#membership-plans" className="rounded-full border border-white/25 px-6 py-3 text-sm text-gray-200">
            View Plans
          </a>
        </div>
      </div>
    </section>
  );
}
