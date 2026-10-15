import React from "react";
import { Star } from "lucide-react";
import { BUSINESS } from "@/data/barbershop-data";

export default function Resenas() {
  return (
    <section id="resenas" className="border-y border-line bg-bg-elevated/20">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8 py-16 md:py-20 text-center">
        <div>
          {/* 5 Golden Stars */}
          <div className="flex items-center justify-center gap-1.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 text-gold fill-gold drop-shadow-[0_2px_8px_rgba(205,165,69,0.4)]"
              />
            ))}
          </div>

          {/* Rating summary */}
          <p className="font-display text-3xl md:text-4xl font-semibold">
            {BUSINESS.googleRating.toFixed(1)}{" "}
            <span className="text-ink-muted text-lg md:text-xl font-sans font-normal">
              · {BUSINESS.googleReviewCount} opiniones en Google
            </span>
          </p>

          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-5 text-sm font-semibold text-gold hover:text-gold-strong border-b border-gold pb-0.5 transition-colors"
          >
            Ver todas las reseñas en Google →
          </a>
        </div>
      </div>
    </section>
  );
}
