import Link from "next/link";
import { businessName, navLinks, phoneDisplay, phoneHref } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-white">{businessName}</p>
          <p className="mt-2 text-sm text-gray-400">Premium Mobile Auto Detailing, coating, correction, and tint.</p>
          <p className="mt-2 text-sm text-gray-300">
            Mobile auto detailing serving MD, VA and DC.
          </p>
          <a href={phoneHref} className="mt-4 inline-block text-sm text-gray-200">
            {phoneDisplay}
          </a>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">Explore</p>
          <ul className="mt-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-gray-400 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">Hours</p>
          <p className="mt-3 text-sm text-gray-400">Mon-Sat: 8:00 AM - 7:00 PM</p>
          <p className="mt-1 text-sm text-gray-400">Sunday: By appointment</p>
          <p className="mt-3 text-sm text-gray-300">Mobile service. We come to you.</p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://www.instagram.com/danielsautodetailing_/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-white/20 p-2 text-gray-200 transition hover:border-accentBlue hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm8.88 1.62a1.13 1.13 0 1 1 0 2.26 1.13 1.13 0 0 1 0-2.26zM12 6.5A5.5 5.5 0 1 1 6.5 12 5.5 5.5 0 0 1 12 6.5zm0 1.5a4 4 0 1 0 4 4 4 4 0 0 0-4-4z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/p/Daniels-auto-detail-LLC-100067382393457/?_rdr"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-white/20 p-2 text-gray-200 transition hover:border-accentBlue hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6h1.7V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.6v8h2.9z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@danielsautodetailing_"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="rounded-full border border-white/20 p-2 text-gray-200 transition hover:border-accentBlue hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M14.6 3h2.8c.2 1.7 1.2 3.2 2.6 4.1v2.9a8.6 8.6 0 0 1-2.7-.8v6.2a5.4 5.4 0 1 1-5.4-5.4c.3 0 .7 0 1 .1v2.9a2.7 2.7 0 0 0-1-.2 2.5 2.5 0 1 0 2.5 2.5V3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        {new Date().getFullYear()} {businessName}. All rights reserved.
      </div>
    </footer>
  );
}
