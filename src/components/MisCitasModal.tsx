"use client";

import React, { useState, useEffect } from "react";
import { X, CalendarDays, Phone, Mail, Clock, Scissors, AlertCircle } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { Appointment } from "@/lib/storage";
import { BARBERS } from "@/data/barbershop-data";

export default function MisCitasModal() {
  const { isMisCitasOpen, closeMisCitas, savedClient } = useBooking();

  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [citas, setCitas] = useState<(Appointment & { pasada: boolean })[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isMisCitasOpen && savedClient) {
      if (savedClient.phone) setTelefono(savedClient.phone);
      if (savedClient.email) setEmail(savedClient.email);
      if (savedClient.phone || savedClient.email) {
        consultarCitas(savedClient.phone, savedClient.email);
      }
    }
  }, [isMisCitasOpen, savedClient]);

  if (!isMisCitasOpen) return null;

  async function consultarCitas(tel: string, mail: string) {
    if (!tel.trim() && !mail.trim()) {
      setErrorMsg("Ingresa tu número de teléfono o correo.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/mis-citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telefono: tel, email: mail }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "No se pudieron consultar tus citas.");
        setCitas([]);
      } else {
        setCitas(data.citas || []);
      }
    } catch {
      setErrorMsg("Error de conexión al consultar tus citas.");
      setCitas([]);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    consultarCitas(telefono, email);
  };

  const proximas = citas?.filter((c) => !c.pasada) || [];
  const pasadas = citas?.filter((c) => c.pasada) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-bg-elevated border border-line rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-bg/60">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-gold" />
            <h2 className="font-display text-xl font-bold uppercase tracking-wider text-ink">
              Mis Citas
            </h2>
          </div>
          <button
            onClick={closeMisCitas}
            className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink-muted hover:text-ink hover:border-gold transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Form */}
        <div className="p-6 border-b border-line bg-bg/30">
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-xs text-ink-muted">
              Consulta tus citas vigentes o pasadas ingresando tu teléfono o correo registrado.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="relative">
                <Phone className="w-4 h-4 text-ink-faint absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="Teléfono / WhatsApp"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full bg-bg border border-line rounded-xl pl-9 pr-3 py-2 text-xs text-ink focus:border-gold focus:outline-none"
                />
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-ink-faint absolute left-3 top-3" />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg border border-line rounded-xl pl-9 pr-3 py-2 text-xs text-ink focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="gold-cta w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              {loading ? "Buscando citas..." : "Buscar Citas"}
            </button>
          </form>

          {errorMsg && (
            <p className="text-xs text-red-400 mt-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMsg}</span>
            </p>
          )}
        </div>

        {/* Results List */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {citas === null ? (
            <div className="text-center py-8 text-sm text-ink-muted">
              Ingresa tus datos arriba para consultar tu historial de citas.
            </div>
          ) : citas.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-8 h-8 text-gold mx-auto mb-2 opacity-60" />
              <p className="text-sm font-semibold text-ink">
                No tienes citas registradas con estos datos.
              </p>
              <p className="text-xs text-ink-muted mt-1">
                Verifica que el número coincida con el que ingresaste al reservar.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Proximas */}
              {proximas.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>Próximas Citas ({proximas.length})</span>
                  </h3>
                  <div className="space-y-3">
                    {proximas.map((c) => {
                      const barber = BARBERS.find((b) => b.id === c.barberId);
                      return (
                        <div
                          key={c.id}
                          className="p-4 rounded-xl border border-gold/40 bg-gold-soft/10 space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-sm text-ink">{c.serviceName}</h4>
                              <p className="text-xs text-ink-muted">
                                Con: <span className="text-gold font-semibold">{c.barberName}</span>
                              </p>
                            </div>
                            <span className="font-display text-sm font-bold text-gold">
                              {c.priceLabel}
                            </span>
                          </div>

                          <div className="text-xs text-ink-faint flex items-center gap-2">
                            <span>📅 {c.dateLabel}</span>
                            <span>⏰ {c.time}</span>
                            <span>⏳ {c.duration} min</span>
                          </div>

                          {barber?.whatsapp && (
                            <div className="pt-2 border-t border-line">
                              <a
                                href={`https://wa.me/${barber.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
                                  `Hola ${barber.name}, te escribo respecto a mi cita agendada para el ${c.dateLabel} a las ${c.time}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-gold hover:underline font-semibold"
                              >
                                Contactar a {c.barberName} por WhatsApp →
                              </a>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pasadas */}
              {pasadas.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-line">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink-faint">
                    Historial de Citas Anteriores
                  </h3>
                  <div className="space-y-2">
                    {pasadas.map((c) => (
                      <div
                        key={c.id}
                        className="p-3 rounded-xl border border-line bg-bg/40 opacity-70 flex justify-between items-center text-xs"
                      >
                        <div>
                          <p className="font-semibold text-ink">{c.serviceName}</p>
                          <p className="text-ink-faint">
                            {c.dateLabel} · {c.time} · {c.barberName}
                          </p>
                        </div>
                        <span className="font-display font-semibold text-gold">
                          {c.priceLabel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
