"use client";

import Image from "next/image";
import { useState } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  compact?: boolean;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
  compact = false
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  return (
    <div className={compact ? "" : "mx-auto max-w-6xl px-4 py-20 sm:px-6"}>
      {!compact ? <p className="text-xs uppercase tracking-[0.18em] text-accentBlue">Before / After</p> : null}
      {!compact ? <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Transformation You Can Feel</h2> : null}
      <div
        className={`relative overflow-hidden rounded-3xl border border-white/10 ${compact ? "mt-0 h-[60vh]" : "mt-8 h-[320px] md:h-[500px]"}`}
        onPointerDown={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setDragging(true);
          handleMove(e.clientX, rect);
        }}
        onPointerMove={(e) => {
          if (!dragging) return;
          const rect = e.currentTarget.getBoundingClientRect();
          handleMove(e.clientX, rect);
        }}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
      >
        <Image src={beforeSrc} alt="Vehicle before detailing" fill className="object-cover" />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
          <Image src={afterSrc} alt="Vehicle after detailing" fill className="object-cover" />
        </div>
        <div
          className="absolute inset-y-0 w-[2px] bg-white"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-charcoal text-xs text-white">
            <span>↔</span>
          </div>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white">{afterLabel}</span>
        <span className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white">{beforeLabel}</span>
      </div>
    </div>
  );
}
