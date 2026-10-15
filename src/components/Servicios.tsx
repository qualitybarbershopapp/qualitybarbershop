"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Check } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import {
  SERVICE_CATEGORIES,
  SERVICE_NOTE,
  formatCOP,
  formatServicePrice,
  Service,
} from "@/data/barbershop-data";

export default function Servicios() {
  const { openBooking } = useBooking();
  const [unasOpen, setUnasOpen] = useState(false);

  const unasCategories = SERVICE_CATEGORIES.filter((c) =>
    c.id.startsWith("unas")
  );
  const totalUnasServices = unasCategories.reduce(
    (acc, c) => acc + c.services.length,
    0
  );

  const cortesCategory = SERVICE_CATEGORIES.find((c) => c.id === "cortes");
  const barbaCategory = SERVICE_CATEGORIES.find((c) => c.id === "barba-combos");
  const marcacionesCategory = SERVICE_CATEGORIES.find((c) => c.id === "marcaciones");
  const adicionalesCategory = SERVICE_CATEGORIES.find((c) => c.id === "adicionales");
  const premiumCategory = SERVICE_CATEGORIES.find((c) => c.id === "premium");

  const handleSelectService = (serviceId: string) => {
    openBooking({ serviceId });
  };

  const renderServiceRow = (s: Service) => {
    const hasPhoto = s.examples && s.examples.length > 0 && s.examples[0].src;

    return (
      <div
        key={s.id}
        role="button"
        tabIndex={0}
        onClick={() => handleSelectService(s.id)}
        onKeyDown={(e) => e.key === "Enter" && handleSelectService(s.id)}
        className="menu-row group flex items-center gap-2.5 rounded-full border border-line px-4 py-2.5 text-left transition-colors hover:border-gold cursor-pointer bg-bg-elevated/40 hover:bg-bg-elevated/80"
      >
        {hasPhoto && (
          <div className="w-9 h-9 rounded-lg overflow-hidden border border-line shrink-0 group-hover:border-gold relative">
            <Image
              src={s.examples![0].src}
              alt={s.name}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="text-sm text-ink group-hover:text-gold transition-colors self-baseline flex items-baseline gap-1.5 flex-wrap">
          <span className="font-medium">{s.name}</span>
          <span className="text-xs text-ink-faint font-normal">
            · {s.duration} min
          </span>
          {s.recommended && (
            <span className="rounded-full bg-gold-soft text-gold text-[10px] font-semibold uppercase tracking-[0.06em] px-2 py-0.5 whitespace-nowrap">
              Recomendado
            </span>
          )}
        </div>

        <span className="menu-dots flex-1" />

        <span className="font-display text-sm font-semibold text-gold whitespace-nowrap self-baseline">
          {formatServicePrice(s)}
        </span>
      </div>
    );
  };

  return (
    <section id="servicios" className="max-w-[1180px] mx-auto px-5 md:px-8 py-20 md:py-28">
      {/* Title */}
      <div className="max-w-lg mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-semibold uppercase tracking-wide">
          Nuestros servicios
        </h2>
        <p className="text-sm text-ink-muted mt-2">
          Haz clic en cualquier servicio para agendar tu turno al instante.
        </p>
      </div>

      {/* Accordion for Uñas (Nails) */}
      <div className="mb-12">
        <div className="rounded-2xl border border-line hover:border-gold transition-colors bg-bg-elevated/50">
          <button
            type="button"
            onClick={() => setUnasOpen(!unasOpen)}
            aria-expanded={unasOpen}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
          >
            <span>
              <span className="block font-display text-lg font-semibold uppercase tracking-[0.06em] text-gold">
                Uñas
                <span className="ml-2 align-middle rounded-full bg-gold-soft text-gold text-[10px] font-semibold uppercase tracking-[0.06em] px-2 py-0.5">
                  Nuevo
                </span>
              </span>
              <span className="block text-xs text-ink-muted mt-1">
                Manicure, pedicure, semipermanente y extensiones · {totalUnasServices} servicios
              </span>
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${
                unasOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {unasOpen && (
            <div className="p-5 border-t border-line space-y-6">
              {unasCategories.map((cat) => (
                <div key={cat.id}>
                  <h4 className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-gold-strong mb-3">
                    {cat.title}
                  </h4>
                  <div className="grid gap-2.5 md:grid-cols-2">
                    {cat.services.map(renderServiceRow)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Standard Barber Services Grid */}
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {/* Cortes de Cabello */}
        {cortesCategory && (
          <div>
            <h3 className="font-display text-lg font-semibold uppercase tracking-[0.06em] text-gold mb-3 pb-2 border-b border-line">
              {cortesCategory.title}
            </h3>
            <div className="flex flex-col gap-2.5">
              {cortesCategory.services.map(renderServiceRow)}
            </div>
          </div>
        )}

        {/* Barba y Combos */}
        {barbaCategory && (
          <div>
            <h3 className="font-display text-lg font-semibold uppercase tracking-[0.06em] text-gold mb-3 pb-2 border-b border-line">
              {barbaCategory.title}
            </h3>
            <div className="flex flex-col gap-2.5">
              {barbaCategory.services.map(renderServiceRow)}
            </div>
          </div>
        )}

        {/* Marcaciones */}
        {marcacionesCategory && (
          <div>
            <h3 className="font-display text-lg font-semibold uppercase tracking-[0.06em] text-gold mb-3 pb-2 border-b border-line">
              {marcacionesCategory.title}
            </h3>
            <div className="flex flex-col gap-2.5">
              {marcacionesCategory.services.map(renderServiceRow)}
            </div>
          </div>
        )}

        {/* Servicios Adicionales */}
        {adicionalesCategory && (
          <div>
            <h3 className="font-display text-lg font-semibold uppercase tracking-[0.06em] text-gold mb-3 pb-2 border-b border-line">
              {adicionalesCategory.title}
            </h3>
            <div className="flex flex-col gap-2.5">
              {adicionalesCategory.services.map(renderServiceRow)}
            </div>
          </div>
        )}
      </div>

      {/* Servicios Premium Section */}
      {premiumCategory && (
        <div className="mt-16">
          <h3 className="font-display text-xl font-semibold uppercase tracking-[0.06em] text-gold mb-6 text-center">
            Servicios Premium VIP
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {premiumCategory.services.map((item) => (
              <div
                key={item.id}
                className="premium-card rounded-brand border border-black/10 p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-end justify-between mb-4 border-b border-black/10 pb-3">
                    <div>
                      <h4 className="font-display text-2xl font-bold text-[#171310]">
                        {item.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#171310]/70 uppercase tracking-wider">
                        {item.duration} min · Experiencia Exclusiva
                      </p>
                    </div>
                    <div className="text-right">
                      {item.originalPrice && (
                        <span className="block text-sm text-[#171310]/60 line-through">
                          {formatCOP(item.originalPrice)}
                        </span>
                      )}
                      <span className="font-display text-3xl font-bold text-[#171310] whitespace-nowrap">
                        {formatCOP(item.price)}
                      </span>
                    </div>
                  </div>

                  {item.includes && (
                    <ul className="text-sm md:text-base text-[#171310] mb-6 flex flex-col gap-2 font-medium">
                      {item.includes.map((inc, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#171310] shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  onClick={() => handleSelectService(item.id)}
                  className="w-full rounded-full bg-[#171310] text-gold-strong py-3 px-5 text-sm font-bold uppercase tracking-wider transition-all hover:bg-black hover:scale-[1.01]"
                >
                  Reservar este paquete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Service Note */}
      <div className="mt-12 border-t border-line pt-6">
        <p className="text-xs text-ink-faint max-w-2xl">
          {SERVICE_NOTE}
        </p>
      </div>
    </section>
  );
}
