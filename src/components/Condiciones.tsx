import React from "react";
import { CONDICIONES } from "@/data/barbershop-data";

export default function Condiciones() {
  return (
    <section id="condiciones" className="max-w-[1180px] mx-auto px-5 md:px-8 py-16 md:py-20 border-t border-line">
      <div className="max-w-lg mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-semibold uppercase">
          Condiciones para agendar citas
        </h2>
      </div>

      <div>
        <ol className="flex flex-col gap-3.5 max-w-2xl">
          {CONDICIONES.map((cond, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-ink-muted">
              <span className="font-display text-gold font-semibold text-base shrink-0">
                {index + 1}.
              </span>
              <span className="leading-relaxed">{cond}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
