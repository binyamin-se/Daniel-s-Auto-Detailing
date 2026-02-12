"use client";

import { useState } from "react";

type GlobalQuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function GlobalQuoteModal({ isOpen, onClose }: GlobalQuoteModalProps) {
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-black/80 p-4">
      <div className="mx-auto mt-6 max-w-2xl rounded-3xl border border-white/10 bg-charcoal p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Get a Quote</h2>
          <button onClick={onClose} className="rounded-full border border-white/20 px-3 py-1 text-sm text-gray-200">
            Close
          </button>
        </div>
        {sent ? (
          <div className="mt-6 rounded-2xl border border-accentBlue/50 bg-accentBlue/10 p-5 text-gray-100">
            Thanks. We received your request and will follow up shortly.
          </div>
        ) : (
          <form
            className="mt-5 grid gap-3 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <input required placeholder="Name" className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white" />
            <input required placeholder="Phone" className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white" />
            <input type="email" required placeholder="Email" className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white" />
            <input placeholder="Vehicle type" className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white" />
            <input placeholder="Service" className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white" />
            <input placeholder="Address (mobile service)" className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white" />
            <input type="datetime-local" className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white" />
            <input type="file" className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-2 text-sm text-white file:mr-3 file:rounded-lg file:border-0 file:bg-accentBlue file:px-3 file:py-2 file:text-white" />
            <textarea rows={4} placeholder="Notes" className="sm:col-span-2 rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white" />
            <button className="sm:col-span-2 rounded-full bg-accentRed px-5 py-3 text-sm font-semibold text-white">
              Submit Quote Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
