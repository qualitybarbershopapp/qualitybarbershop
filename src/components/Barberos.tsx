"use client";

import React from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { BARBERS } from "@/data/barbershop-data";

export default function Barberos() {
  const { openBooking } = useBooking();
  const staff = BARBERS.filter((b) => b.id !== "cualquiera");

  return (
    <section id="barberos" className="border-y border-line">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-lg mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-semibold uppercase">
            Nuestro equipo
          </h2>
          <p className="text-sm text-ink-muted mt-2">
            El equipo profesional que te va a atender.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {staff.map((member) => {
            const isFemale = member.genero === "f";
            const pronoun = isFemale ? "ella" : "él";
            const phoneDigits = member.whatsapp?.replace(/\D/g, "").slice(-10) || "";

            return (
              <div
                key={member.id}
                className="group flex flex-col items-center text-center rounded-3xl border border-line p-6 transition-all duration-300 hover:border-gold bg-bg-elevated/40 hover:bg-bg-elevated/80 hover:-translate-y-1"
              >
                {/* Photo */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold mb-4 transition-transform duration-300 group-hover:scale-105 relative">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-bg-elevated-2 flex items-center justify-center font-display text-2xl font-bold text-gold">
                      {member.initials}
                    </div>
                  )}
                </div>

                {/* Name & Role */}
                <h3 className="font-display text-xl font-semibold text-ink">
                  {member.name}
                </h3>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold mt-1">
                  {member.role}
                </p>

                {/* Contact Links */}
                <div className="flex items-center justify-center gap-3 mt-4">
                  {member.whatsapp && (
                    <a
                      href={`tel:${member.whatsapp}`}
                      className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-gold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold" />
                      <span>{phoneDigits.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}</span>
                    </a>
                  )}

                  {member.whatsapp && (
                    <a
                      href={`https://wa.me/${member.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Escribirle a ${member.name} por WhatsApp`}
                      title="WhatsApp"
                      className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-line text-gold hover:border-gold hover:bg-gold-soft transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Z" />
                        <path d="M16.56 14.06c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.4-.42-.55-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.04 0 1.21.88 2.37 1 2.54.13.16 1.74 2.65 4.21 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29Z" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Booking CTA Button */}
                <div className="mt-auto pt-5 w-full">
                  <div className="border-t border-line pt-4">
                    <button
                      onClick={() => openBooking({ barberId: member.id })}
                      className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-gold/60 px-4 py-2.5 text-xs font-semibold text-gold transition-all hover:bg-gold hover:text-bg hover:shadow-lg"
                    >
                      <span>Reservar con {pronoun}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
