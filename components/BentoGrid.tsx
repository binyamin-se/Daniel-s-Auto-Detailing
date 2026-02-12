import Image from "next/image";

const cards = [
  { title: "Interior Reset", stat: "2-4 hrs", desc: "Steam, extraction, leather care." },
  { title: "Paint Correction", stat: "Up to 85%", desc: "Swirl reduction and clarity gain." },
  { title: "Ceramic Protection", stat: "1-5 years", desc: "Hydrophobic and UV defense." },
  { title: "Window Tint", stat: "99% UV", desc: "Heat rejection + cleaner profile." },
  { title: "Weekly Memberships", stat: "4 washes/mo", desc: "Recurring plans for always-clean vehicles." },
  {
    title: "We Come To You",
    stat: "Mobile Convenience",
    desc: "Home, apartment garage, office parking lot - we bring everything needed.",
    chips: ["Fully Mobile", "Water/Power Options", "Weekend Availability"]
  }
];

export function BentoGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-accentBlue">Signature Services</p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Luxury Results, Built-In Process</h2>
        </div>
      </div>
      <div className="grid auto-rows-[180px] gap-4 md:grid-cols-6">
        {cards.map((card, i) => (
          <article
            key={card.title}
            className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-glass backdrop-blur-xl ${
              i === 0 ? "md:col-span-3 md:row-span-2" : "md:col-span-3"
            } ${i === 3 ? "md:col-span-2" : ""} ${i === 4 ? "md:col-span-2" : ""}`}
          >
            <p className="text-sm text-gray-300">{card.stat}</p>
            <h3 className="mt-1 text-xl font-medium text-white">{card.title}</h3>
            <p className="mt-2 text-sm text-gray-400">{card.desc}</p>
            {card.chips ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {card.chips.map((chip) => (
                  <span key={chip} className="rounded-full border border-white/20 px-2.5 py-1 text-[11px] text-gray-200">
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 md:col-span-2 md:row-span-2">
          <Image
            src="https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=1200&q=80"
            alt="Detailed luxury vehicle"
            fill
            className="object-cover transition duration-700 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
