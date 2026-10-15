"use client";

import React from "react";
import { MapPin, Share2 } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { BUSINESS } from "@/data/barbershop-data";

export default function Ubicacion() {
  const { openCompartir } = useBooking();

  return (
    <section id="ubicacion" className="border-t border-line">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8 py-16 md:py-20 grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            Ubicación
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold uppercase mb-4">
            Visítanos
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed max-w-md mb-6">
            Encuéntranos en {BUSINESS.city}. Abre nuestra ubicación en Google Maps con el botón de abajo para llegar fácilmente. Si ya viviste la experiencia Quality Barber Shop, déjanos una reseña en Google. Tu opinión nos ayuda a seguir mejorando. ⭐⭐⭐⭐⭐
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-cta inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:brightness-110"
            >
              <MapPin className="w-4 h-4" />
              <span>Cómo llegar</span>
            </a>

            <button
              type="button"
              onClick={openCompartir}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold bg-gold-soft px-6 py-2.5 text-sm font-semibold text-gold transition-colors hover:brightness-125"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartir</span>
            </button>
          </div>
        </div>

        <div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-line bg-bg-elevated shadow-xl">
            <iframe
              src={BUSINESS.mapsEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Quality Barber Shop"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
