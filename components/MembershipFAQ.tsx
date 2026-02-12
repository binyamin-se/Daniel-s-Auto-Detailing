"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What counts as a wash?",
    a: "A membership wash is one scheduled weekly maintenance visit with services based on your tier."
  },
  {
    q: "What if it rains?",
    a: "If weather impacts quality, we reschedule to the next best slot."
  },
  {
    q: "Can I reschedule?",
    a: "Yes. Just notify us in advance and we will move your weekly visit."
  },
  {
    q: "Do washes roll over?",
    a: "Unused washes may roll over for a limited time (policy placeholder)."
  },
  {
    q: "Do you serve apartments/offices?",
    a: "Yes, as long as access and property rules allow mobile service."
  },
  {
    q: "Do you offer multi-vehicle discounts?",
    a: "Yes, we can customize pricing for households or teams with multiple vehicles."
  }
];

export function MembershipFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mt-14">
      <h2 className="text-3xl font-semibold text-white">Membership FAQ</h2>
      <div className="mt-5 space-y-3">
        {faqs.map((item, idx) => (
          <article key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <button className="flex w-full items-center justify-between text-left" onClick={() => setOpen(open === idx ? null : idx)}>
              <span className="font-medium text-white">{item.q}</span>
              <span className="text-gray-300">{open === idx ? "−" : "+"}</span>
            </button>
            {open === idx ? <p className="mt-3 text-sm text-gray-300">{item.a}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
