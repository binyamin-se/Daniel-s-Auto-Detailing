const stats = [
  { label: "Google Rating", value: "4.9★" },
  { label: "Mobile Visits", value: "2,000+" },
  { label: "Repeat Clients", value: "78%" },
  { label: "Avg. Response", value: "<15 min" }
];

export function SocialProofStrip() {
  return (
    <section className="border-y border-white/10 bg-white/[0.02]">
      <div className="mx-auto grid max-w-7xl gap-3 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-xl border border-white/10 bg-charcoal/40 px-4 py-3">
            <p className="text-xl font-semibold text-white">{stat.value}</p>
            <p className="text-xs uppercase tracking-[0.14em] text-gray-300">{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
