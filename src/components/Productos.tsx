"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Droplet, Brush, Sparkles, ChevronDown } from "lucide-react";
import { PRODUCT_CATEGORIES, ProductItem } from "@/data/barbershop-data";

export default function Productos() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleItem = (name: string) => {
    setActiveItem(activeItem === name ? null : name);
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "cabello":
        return <Droplet className="w-5 h-5 text-gold" />;
      case "barba":
        return <Brush className="w-5 h-5 text-gold" />;
      default:
        return <Sparkles className="w-5 h-5 text-gold" />;
    }
  };

  return (
    <section id="productos" className="border-t border-line">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8 py-20 md:py-28 grid gap-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16">
        {/* Left Column */}
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold uppercase mb-4">
            Productos para tu cuidado
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Además del corte, tenemos productos para cuidar tu imagen en casa: cabello, barba y lociones.
          </p>
        </div>

        {/* Right Column: Categories */}
        <div className="flex flex-col gap-10">
          {PRODUCT_CATEGORIES.map((cat) => (
            <div key={cat.id} className="group flex items-start gap-4">
              <span className="w-11 h-11 shrink-0 rounded-full bg-bg-elevated-2 border border-gold flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {getCategoryIcon(cat.id)}
              </span>

              <div className="flex-1">
                <h3 className="font-display text-xl font-semibold mb-1 text-ink">
                  {cat.title}
                </h3>
                <p className="text-sm text-ink-muted mb-4">{cat.description}</p>

                <div className="flex flex-col gap-3">
                  {cat.items.map((item) => {
                    const isExpanded = activeItem === item.name;

                    return (
                      <div
                        key={item.name}
                        className="rounded-xl border border-line overflow-hidden transition-colors hover:border-gold bg-bg-elevated/40"
                      >
                        <button
                          type="button"
                          onClick={() => toggleItem(item.name)}
                          className="flex items-center justify-between gap-3 w-full px-4 py-3 text-left"
                        >
                          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gold">
                            {item.name}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-gold shrink-0 transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="p-4 border-t border-line bg-bg-elevated-2/50 space-y-4">
                            {item.brands.length > 0 && (
                              <div>
                                <span className="text-xs text-ink-faint uppercase tracking-wider block mb-1">
                                  Marcas disponibles:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {item.brands.map((b) => (
                                    <span
                                      key={b}
                                      className="rounded-full bg-bg border border-line px-2.5 py-0.5 text-xs text-ink-muted font-medium"
                                    >
                                      {b}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {item.photos.length > 0 && (
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {item.photos.slice(0, 4).map((p, i) => (
                                  <div
                                    key={i}
                                    className="aspect-square relative rounded-lg overflow-hidden border border-line bg-bg"
                                  >
                                    <Image
                                      src={p.src}
                                      alt={p.alt}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                            <a
                              href={`https://wa.me/573234928607?text=Hola,%20quisiera%20consultar%20precio%20y%20disponibilidad%20del%20producto:%20${encodeURIComponent(
                                item.name
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:underline pt-1"
                            >
                              Consultar disponibilidad por WhatsApp →
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
