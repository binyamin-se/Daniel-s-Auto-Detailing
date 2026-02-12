"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { GalleryItem } from "@/lib/types";

type LightboxProps = {
  items: GalleryItem[];
  initialIndex: number;
  onClose: () => void;
  onNavigate: (item: GalleryItem) => void;
};

export function Lightbox({ items, initialIndex, onClose, onNavigate }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [showCompare, setShowCompare] = useState(false);

  const goTo = (nextIndex: number) => {
    const normalized = (nextIndex + items.length) % items.length;
    setIndex(normalized);
    onNavigate(items[normalized]);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goTo(index + 1);
      if (event.key === "ArrowLeft") goTo(index - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, onClose, items.length]);

  useEffect(() => {
    setShowCompare(false);
  }, [index]);

  const current = items[index];

  return (
    <div className="fixed inset-0 z-[70] bg-black/90 p-4" role="dialog" aria-modal="true">
      <button onClick={onClose} className="absolute right-4 top-4 rounded-full border border-white/30 px-3 py-1 text-sm text-white">
        Close
      </button>
      <div className="mx-auto flex h-full max-w-5xl items-center">
        <button onClick={() => goTo(index - 1)} className="mr-3 rounded-full border border-white/20 px-3 py-2 text-white">
          Prev
        </button>
        <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/20">
          {showCompare && current.beforeSrc && current.afterSrc ? (
            <BeforeAfterSlider beforeSrc={current.beforeSrc} afterSrc={current.afterSrc} compact />
          ) : (
            <div className="relative h-[70vh]">
              <Image src={current.src} alt={current.alt} fill className="object-cover" />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <p className="font-medium">{current.caption}</p>
            <p className="text-xs text-gray-200">{current.category}</p>
            {current.beforeSrc && current.afterSrc ? (
              <button
                onClick={() => setShowCompare((value) => !value)}
                className="mt-2 rounded-full border border-white/30 px-3 py-1 text-xs"
              >
                {showCompare ? "Back to Photo" : "Compare"}
              </button>
            ) : null}
          </div>
        </div>
        <button onClick={() => goTo(index + 1)} className="ml-3 rounded-full border border-white/20 px-3 py-2 text-white">
          Next
        </button>
      </div>
    </div>
  );
}
