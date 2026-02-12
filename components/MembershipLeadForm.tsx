"use client";

import { FormEvent, useState } from "react";

export function MembershipLeadForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <h2 className="text-3xl font-semibold text-white">Join Membership</h2>
      <p className="mt-2 text-sm text-gray-300">No payment yet. We confirm route, timing and final details by text.</p>
      {sent ? (
        <div className="mt-5 rounded-xl border border-accentBlue/50 bg-accentBlue/10 p-4 text-sm text-gray-100">
          We&apos;ll confirm your location and text you to finalize your membership.
        </div>
      ) : (
        <form className="mt-5 grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <input required placeholder="Name" className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white" />
          <input required placeholder="Phone" className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white" />
          <input required type="email" placeholder="Email" className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white" />
          <input required placeholder="Vehicle type" className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white" />
          <input required placeholder="Address" className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white" />
          <input required placeholder="Preferred day/time" className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white" />
          <button className="sm:col-span-2 rounded-full bg-accentBlue px-5 py-3 text-sm font-semibold text-white">
            Join Membership
          </button>
        </form>
      )}
    </section>
  );
}
