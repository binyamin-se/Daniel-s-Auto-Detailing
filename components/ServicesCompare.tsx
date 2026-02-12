"use client";

import Link from "next/link";
import { useState } from "react";
import { detailingPackages } from "@/lib/packages";
import { VehicleSize } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const sizes: VehicleSize[] = ["Sedan", "SUV", "XL"];

export function ServicesCompare() {
  const [size, setSize] = useState<VehicleSize>("Sedan");

  return (
    <>
      <div className="mt-8 inline-flex rounded-full border border-white/15 bg-white/5 p-1">
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

      <section className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/[0.03]">
            <tr>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.16em] text-gray-300">Package</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.16em] text-gray-300">Starting ({size})</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.16em] text-gray-300">Includes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {detailingPackages.map((pkg) => (
              <tr key={pkg.id}>
                <td className="px-4 py-3 text-sm text-white">{pkg.name}</td>
                <td className="px-4 py-3 text-sm text-gray-200">{formatPrice(pkg.prices[size])}+</td>
                <td className="px-4 py-3 text-sm text-gray-300">{pkg.includes.length} line items</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {detailingPackages.map((pkg) => (
          <article
            key={pkg.id}
            className={`rounded-2xl border p-5 ${
              pkg.popular ? "border-accentBlue bg-accentBlue/10" : "border-white/10 bg-white/[0.03]"
            }`}
          >
            {pkg.popular ? (
              <span className="rounded-full bg-accentRed px-3 py-1 text-xs font-semibold text-white">Most Popular</span>
            ) : null}
            <h2 className="mt-3 text-xl font-semibold text-white">{pkg.name}</h2>
            <p className="mt-2 text-sm text-gray-300">{pkg.description}</p>
            <p className="mt-3 text-sm text-gray-200">Starting at {formatPrice(pkg.prices[size])}+</p>
            <ul className="mt-3 space-y-2">
              {pkg.includes.map((item) => (
                <li key={item} className="text-sm text-gray-300">
                  - {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/quote?service=Detailing&vehicleSize=${size}&package=${encodeURIComponent(pkg.name)}`}
              className="mt-4 inline-block rounded-full bg-accentBlue px-4 py-2 text-sm text-white"
            >
              Pick this package
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
