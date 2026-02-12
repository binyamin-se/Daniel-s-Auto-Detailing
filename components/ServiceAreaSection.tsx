import { serviceAreaCities } from "@/lib/content";

type ServiceAreaSectionProps = {
  title?: string;
};

export function ServiceAreaSection({ title = "Service Area" }: ServiceAreaSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-accentBlue">Mobile Coverage</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">{title}</h2>
        <p className="mt-3 text-gray-300">We come to your home or workplace across these areas:</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {serviceAreaCities.map((city) => (
            <span key={city} className="rounded-full border border-white/20 px-3 py-1 text-sm text-gray-200">
              {city}
            </span>
          ))}
        </div>
        <p className="mt-5 text-sm text-gray-300">
          Not sure if you&apos;re in range? Send your zip code - we&apos;ll confirm fast.
        </p>
      </div>
    </section>
  );
}
