"use client";

import Link from "next/link";
import { useState } from "react";
import { detailingAddOns, detailingPackages } from "@/lib/packages";
import { VehicleSize } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const sizes: VehicleSize[] = ["Sedan", "SUV", "XL"];

export function PricingToggle() {
  const [size, setSize] = useState<VehicleSize>("Sedan");

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-accentBlue">Packages</p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Starting at Premium Value</h2>
        </div>
        <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1">
          {sizes.map((entry) => (
            <button
              key={entry}
              onClick={() => setSize(entry)}
              className={`rounded-full px-4 py-2 text-sm ${
                size === entry ? "bg-accentBlue text-white" : "text-gray-300"
              }`}
            >
              {entry}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {detailingPackages.map((pkg) => (
          <article
            key={pkg.id}
            className={`rounded-2xl border p-6 ${pkg.popular ? "border-accentBlue bg-accentBlue/10" : "border-white/10 bg-white/[0.03]"}`}
          >
            {pkg.popular ? (
              <span className="rounded-full bg-accentRed/90 px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
            ) : null}
            <h3 className="mt-3 text-2xl font-semibold text-white">{pkg.name}</h3>
            <p className="mt-2 text-sm text-gray-300">{pkg.description}</p>
            <p className="mt-4 text-sm text-gray-300">
              Starting at <span className="text-2xl font-semibold text-white">{formatPrice(pkg.prices[size])}</span>
            </p>
            <ul className="mt-4 space-y-2">
              {pkg.includes.map((item) => (
                <li key={item} className="text-sm text-gray-300">
                  - {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/quote?service=Detailing&vehicleSize=${size}&package=${encodeURIComponent(pkg.name)}`}
              className="mt-6 inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-charcoal"
            >
              Pick this package
            </Link>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-sm font-medium text-white">Popular add-ons</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {detailingAddOns.map((addon) => (
            <span key={addon.id} className="rounded-full border border-white/20 px-3 py-1 text-xs text-gray-300">
              {addon.name} +{formatPrice(addon.price)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
