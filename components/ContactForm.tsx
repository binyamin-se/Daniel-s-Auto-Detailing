"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="mt-5 rounded-xl border border-accentBlue/50 bg-accentBlue/15 p-4 text-sm text-gray-100">
        Thanks. We received your message and will reach out shortly.
      </div>
    );
  }

  return (
    <form className="mt-5 space-y-3" onSubmit={onSubmit}>
      <input
        required
        placeholder="Full name"
        className="w-full rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
      />
      <input
        required
        type="email"
        placeholder="Email"
        className="w-full rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
      />
      <input
        required
        placeholder="Phone"
        className="w-full rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
      />
      <textarea
        required
        rows={5}
        placeholder="How can we help?"
        className="w-full rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
      />
      <button className="rounded-full bg-accentBlue px-5 py-2 text-sm font-semibold text-white">Send Message</button>
    </form>
  );
}
