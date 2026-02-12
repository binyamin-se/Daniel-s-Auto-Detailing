export function InstagramSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-accentBlue">Instagram</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Follow Recent Work</h2>
        <p className="mt-3 max-w-2xl text-gray-300">
          MOBILE SERVICE • AUTO DETAILING • PAINT CORRECTION • CERAMIC COATING • WINDOW TINT
        </p>
        <a
          href="https://www.instagram.com/danielsautodetailing_/"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block rounded-full bg-accentBlue px-5 py-3 text-sm font-semibold text-white"
        >
          View Instagram
        </a>
      </div>
    </section>
  );
}
