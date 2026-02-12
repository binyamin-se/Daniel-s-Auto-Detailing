"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { galleryItems } from "@/lib/gallery";
import { GalleryItem } from "@/lib/types";
import { classNames } from "@/lib/utils";
import { Lightbox } from "@/components/Lightbox";

const filters = ["All", "Detailing", "Interior", "Ceramic", "Tint", "Before/After"] as const;
type Filter = (typeof filters)[number];

export function GalleryGrid({ limit, showFilters = true }: { limit?: number; showFilters?: boolean }) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const list = useMemo(() => {
    const filtered =
      activeFilter === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter);
    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }, [activeFilter, limit]);

  const openIndex = list.findIndex((item) => item.id === openId);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      {showFilters ? (
        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={classNames(
                "rounded-full border px-3 py-1.5 text-xs",
                activeFilter === filter
                  ? "border-accentBlue bg-accentBlue/20 text-white"
                  : "border-white/20 text-gray-300"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      ) : null}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {list.map((item) => (
          <button
            key={item.id}
            className="group relative mb-4 block w-full overflow-hidden rounded-2xl border border-white/10 text-left"
            onClick={() => setOpenId(item.id)}
          >
            <div className="relative h-64">
              <Image src={item.src} alt={item.alt} fill className="object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-sm font-medium text-white">{item.caption}</p>
              <p className="text-xs text-gray-200">{item.category}</p>
              {item.beforeSrc && item.afterSrc ? (
                <span className="mt-2 inline-block rounded-full border border-white/40 px-2 py-1 text-[10px] text-white">
                  Compare
                </span>
              ) : null}
            </div>
          </button>
        ))}
      </div>
      {openIndex >= 0 ? (
        <Lightbox
          items={list}
          initialIndex={openIndex}
          onClose={() => setOpenId(null)}
          onNavigate={(item: GalleryItem) => setOpenId(item.id)}
        />
      ) : null}
    </section>
  );
}
