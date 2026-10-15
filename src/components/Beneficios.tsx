import React from "react";
import { CalendarCheck, MessageCircle, Scissors } from "lucide-react";

export default function Beneficios() {
  const items = [
    {
      icon: <CalendarCheck className="w-6 h-6 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />,
      title: "Reserva en minutos",
      desc: "Elige servicio, barbero y horario en línea, sin llamadas ni esperas.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />,
      title: "Confirmación al instante",
      desc: "Recibes confirmación directa de tu cita, la hora y el barbero asignado.",
    },
    {
      icon: <Scissors className="w-6 h-6 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />,
      title: "Barberos expertos",
      desc: "Equipo con años de experiencia en corte clásico y de tendencia.",
    },
  ];

  return (
    <section className="border-t border-line">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8 py-14 grid gap-10 sm:grid-cols-3 sm:divide-x sm:divide-line">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="sm:px-8 first:sm:pl-0 last:sm:pr-0 flex items-start gap-4"
          >
            {item.icon}
            <div>
              <h3 className="font-display text-base font-semibold mb-1 text-ink">
                {item.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
