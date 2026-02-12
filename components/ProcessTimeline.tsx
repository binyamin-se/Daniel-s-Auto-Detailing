const steps = [
  { title: "Book", desc: "Pick your package and preferred day/time in minutes." },
  { title: "We Arrive", desc: "Our mobile team arrives at your home or workplace." },
  { title: "Detail", desc: "Paint-safe wash, interior reset, correction, tint or coating work." },
  { title: "Protect", desc: "Sealants/coatings applied for gloss and durability." },
  { title: "Deliver", desc: "Final walkthrough and aftercare guidance before we wrap." }
];

export function ProcessTimeline() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-3xl font-semibold text-white">Our Process</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {steps.map((step, idx) => (
          <article key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-accentBlue">0{idx + 1}</p>
            <h3 className="mt-2 text-lg font-medium text-white">{step.title}</h3>
            <p className="mt-2 text-sm text-gray-300">{step.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
