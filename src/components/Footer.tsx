"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Share2 } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { BUSINESS } from "@/data/barbershop-data";

export default function Footer() {
  const { openCompartir } = useBooking();

  return (
    <footer id="nosotros" className="border-t border-line bg-bg relative">
      <div className="stripe-divider" />

      <div className="max-w-[1180px] mx-auto px-5 md:px-8 py-14 grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <div className="transition-transform duration-500 ease-out hover:rotate-[18deg]">
              <Image
                src="/logo-mark.png"
                alt={BUSINESS.name}
                width={44}
                height={44}
                className="rounded-full"
              />
            </div>
            <div className="leading-tight">
              <span className="font-script block text-3xl md:text-4xl text-gold-strong leading-none">
                Quality
              </span>
              <span className="block text-[11px] md:text-xs font-bold uppercase tracking-[0.28em] text-ink">
                Barber Shop
              </span>
            </div>
          </div>
          <p className="text-sm text-ink-muted mt-4 max-w-xs leading-relaxed">
            {BUSINESS.tagline}.
          </p>
        </div>

        {/* Schedule */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            Horario
          </p>
          <p className="text-sm text-ink-muted">Lun, Mar, Mié, Jue, Vie, Sáb</p>
          <p className="text-sm text-ink font-semibold mt-1">
            7:20 a.m. – 8:00 p.m.
          </p>
          <p className="text-xs text-ink-faint mt-1">Domingos cerrado</p>
        </div>

        {/* Contact & Share */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            Contacto
          </p>
          <a
            href={BUSINESS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-gold transition-colors"
          >
            <Instagram className="w-4 h-4 text-gold" />
            <span>{BUSINESS.instagram}</span>
          </a>

          <div className="mt-6">
            <p className="text-sm text-ink-muted mb-2">
              ¿Le sirve a alguien que conoces?
            </p>
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
      </div>

      <div className="border-t border-line py-6 text-center text-xs text-ink-faint">
        © {new Date().getFullYear()} {BUSINESS.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
