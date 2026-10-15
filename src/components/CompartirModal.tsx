"use client";

import React, { useState } from "react";
import { X, Copy, Check, Share2 } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { BUSINESS } from "@/data/barbershop-data";

export default function CompartirModal() {
  const { isCompartirOpen, closeCompartir } = useBooking();
  const [copied, setCopied] = useState(false);

  if (!isCompartirOpen) return null;

  const url = BUSINESS.siteUrl;
  const shareText = `Reserva tu cita en ${BUSINESS.name}: ${BUSINESS.tagline}. Agéndate en segundos:`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-bg-elevated border border-line rounded-2xl p-6 shadow-2xl text-center space-y-5">
        <button
          onClick={closeCompartir}
          className="absolute right-4 top-4 w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink-muted hover:text-ink hover:border-gold transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-full border border-gold bg-gold-soft text-gold flex items-center justify-center mx-auto">
          <Share2 className="w-6 h-6" />
        </div>

        <div>
          <h3 className="font-display text-xl font-bold uppercase text-ink">
            Compartir Barbería
          </h3>
          <p className="text-xs text-ink-muted mt-1">
            Recomienda Quality Barber Shop a tus amigos o familiares.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `${shareText} ${url}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-md"
          >
            <span>Compartir en WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-2.5 rounded-full border border-line text-ink hover:border-gold hover:text-gold transition-colors text-xs font-semibold flex items-center justify-center gap-2 bg-bg/50"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-gold" />
                <span className="text-gold">¡Enlace copiado al portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar enlace directo</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
