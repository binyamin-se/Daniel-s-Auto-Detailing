"use client";

import { VehicleSize } from "@/lib/types";

const sizes: VehicleSize[] = ["Sedan", "SUV", "XL"];

type VehicleSizeToggleProps = {
  value: VehicleSize;
  onChange: (size: VehicleSize) => void;
};

export function VehicleSizeToggle({ value, onChange }: VehicleSizeToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={`rounded-full px-4 py-2 text-sm ${
            value === size ? "bg-accentBlue text-white" : "text-gray-300"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
