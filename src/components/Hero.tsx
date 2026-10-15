"use client";

import React from "react";
import Image from "next/image";
import { useBooking } from "@/context/BookingContext";
import { BUSINESS } from "@/data/barbershop-data";

export default function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative overflow-hidden min-h-[580px] md:min-h-[660px] flex items-center justify-center">
        {/* Background Image with luxury dark gradient */}
        <div aria-hidden="true" className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Quality Barber Shop Atmosphere"
            fill
            className="object-cover opacity-60 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 85% 90% at 50% 60%, transparent 0%, var(--bg) 92%)",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1180px] mx-auto px-5 md:px-8 py-20 md:py-32 text-center">
          <div>
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.32em] text-gold mb-5 inline-block px-4 py-1.5 rounded-full bg-gold-soft border border-gold/30">
              Barbería · Reservas en línea
            </p>
          </div>

          <div className="mb-6">
            <h1 className="leading-tight">
              <span className="font-script block text-gold-strong text-[clamp(62px,12vw,110px)] leading-none drop-shadow-[0_4px_24px_rgba(205,165,69,0.3)]">
                Quality
              </span>
              <span className="font-display block text-[clamp(28px,6vw,52px)] font-bold uppercase tracking-[0.16em] text-ink mt-1">
                Barber Shop
              </span>
            </h1>
          </div>

          <div>
            <p className="text-base md:text-xl text-ink-muted max-w-xl mx-auto leading-relaxed mb-10">
              {BUSINESS.tagline}. Elige tu servicio, tu barbero y tu horario en menos de un minuto.
            </p>
          </div>

          <div>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => openBooking()}
                className="gold-cta rounded-full px-8 py-4 text-sm md:text-base font-semibold uppercase tracking-[0.08em]"
              >
                Reservar cita
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Traditional Barber Stripe Divider */}
      <div className="stripe-divider" />
    </section>
  );
}
