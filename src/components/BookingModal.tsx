"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  AlertCircle,
  Scissors,
} from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import {
  SERVICE_CATEGORIES,
  ALL_SERVICES,
  BARBERS,
  resumenServicios,
  equipoParaServicios,
  formatCOP,
  Service,
  Barber,
} from "@/data/barbershop-data";
import {
  formatDateKeyLabel,
  getMonthCalendar,
  formatWhatsAppPhone,
} from "@/lib/booking-utils";

export default function BookingModal() {
  const {
    isBookingOpen,
    closeBooking,
    draft,
    updateDraft,
    resetDraft,
    currentStep,
    setCurrentStep,
    saveClientData,
  } = useBooking();

  // Calendar navigation state
  const today = useMemo(() => new Date(), []);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  // Available time slots state
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loadingTimes, setLoadingTimes] = useState(false);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedData, setConfirmedData] = useState<{
    appointmentId?: string;
    assignedBarberName?: string;
  } | null>(null);

  // Selected services summary
  const selectedServiceIds = useMemo(() => {
    const list: string[] = [];
    if (draft.serviceId) list.push(draft.serviceId);
    if (draft.extraIds && draft.extraIds.length > 0) {
      list.push(...draft.extraIds);
    }
    return list;
  }, [draft.serviceId, draft.extraIds]);

  const summary = useMemo(
    () => resumenServicios(selectedServiceIds, draft.quantity),
    [selectedServiceIds, draft.quantity]
  );

  // Qualified barbers for chosen services
  const qualifiedBarbers = useMemo(() => {
    if (selectedServiceIds.length === 0) return BARBERS;
    const team = equipoParaServicios(selectedServiceIds);
    return [
      BARBERS.find((b) => b.id === "cualquiera")!,
      ...team,
    ].filter(Boolean);
  }, [selectedServiceIds]);

  // Fetch available slots when on Step 3 (Time slot)
  useEffect(() => {
    if (currentStep === 3 && draft.dateKey && draft.barberId) {
      let isMounted = true;
      setLoadingTimes(true);
      setAvailableTimes([]);

      const params = new URLSearchParams({
        dateKey: draft.dateKey,
        barberId: draft.barberId,
        duration: summary.duracion.toString(),
        servicios: selectedServiceIds.join(","),
      });

      fetch(`/api/booking?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) {
            setAvailableTimes(data.availableTimes || []);
          }
        })
        .catch((err) => {
          console.error("Error fetching times:", err);
          if (isMounted) setAvailableTimes([]);
        })
        .finally(() => {
          if (isMounted) setLoadingTimes(false);
        });

      return () => {
        isMounted = false;
      };
    }
  }, [currentStep, draft.dateKey, draft.barberId, summary.duracion, selectedServiceIds]);

  if (!isBookingOpen) return null;

  // Handlers for Services Selection
  const toggleService = (sId: string) => {
    if (!draft.serviceId) {
      updateDraft({ serviceId: sId });
      return;
    }

    if (draft.serviceId === sId) {
      // Unselect primary
      if (draft.extraIds.length > 0) {
        const nextPrimary = draft.extraIds[0];
        const nextExtras = draft.extraIds.slice(1);
        updateDraft({ serviceId: nextPrimary, extraIds: nextExtras });
      } else {
        updateDraft({ serviceId: null, extraIds: [] });
      }
      return;
    }

    if (draft.extraIds.includes(sId)) {
      updateDraft({
        extraIds: draft.extraIds.filter((id) => id !== sId),
      });
    } else {
      updateDraft({
        extraIds: [...draft.extraIds, sId],
      });
    }
  };

  // Handle final appointment submission
  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.fullName.trim() || !draft.phone.trim()) {
      setSubmitError("Por favor completa tu nombre y número de teléfono/WhatsApp.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const barber = BARBERS.find((b) => b.id === draft.barberId);
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: draft.serviceId,
          extraServiceIds: draft.extraIds,
          serviceName: summary.nombre,
          servicePrice: summary.precioMin,
          priceLabel: summary.etiqueta,
          quantity: draft.quantity,
          duration: summary.duracion,
          barberName: barber?.name || "Cualquiera disponible",
          barberId: draft.barberId,
          dateKey: draft.dateKey,
          dateLabel: draft.dateLabel,
          time: draft.time,
          fullName: draft.fullName.trim(),
          email: draft.email.trim(),
          phone: draft.phone.trim(),
          notes: draft.notes.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "No se pudo agendar la cita. Por favor intenta otro horario.");
        return;
      }

      // Save client info to localStorage for next time
      saveClientData({
        fullName: draft.fullName.trim(),
        email: draft.email.trim(),
        phone: draft.phone.trim(),
      });

      setConfirmedData({
        appointmentId: data.appointmentId,
        assignedBarberName: data.assignedBarberName,
      });

      setCurrentStep(5); // Show success screen
    } catch (err) {
      console.error(err);
      setSubmitError("Hubo un problema de conexión al procesar la cita.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedBarber = BARBERS.find((b) => b.id === draft.barberId);

  // Month navigation
  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(calYear - 1);
    } else {
      setCalMonth(calMonth - 1);
    }
  };

  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(calYear + 1);
    } else {
      setCalMonth(calMonth + 1);
    }
  };

  const calendarDays = getMonthCalendar(calYear, calMonth);
  const currentMonthName = new Date(calYear, calMonth, 1).toLocaleDateString(
    "es-CO",
    { month: "long", year: "numeric" }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-bg-elevated border border-line rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-bg/60">
          <div className="flex items-center gap-3">
            {currentStep > 0 && currentStep < 5 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink hover:border-gold hover:text-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-wider text-ink">
                {currentStep === 0 && "1. Elige tu Servicio"}
                {currentStep === 1 && "2. Elige tu Barbero / Especialista"}
                {currentStep === 2 && "3. Elige la Fecha"}
                {currentStep === 3 && "4. Elige la Hora"}
                {currentStep === 4 && "5. Tus Datos de Contacto"}
                {currentStep === 5 && "¡Cita Confirmada!"}
              </h2>
              {currentStep < 5 && summary.servicios.length > 0 && (
                <p className="text-xs text-gold">
                  {summary.nombre} · {summary.etiqueta} ({summary.duracion} min)
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              if (currentStep === 5) resetDraft();
              closeBooking();
            }}
            className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink-muted hover:text-ink hover:border-gold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 0: Services */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <p className="text-sm text-ink-muted">
                Selecciona el servicio principal que deseas agendar. Puedes combinar servicios si lo deseas.
              </p>

              {SERVICE_CATEGORIES.map((cat) => (
                <div key={cat.id} className="space-y-3">
                  <h3 className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-gold border-b border-line pb-1.5">
                    {cat.title}
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {cat.services.map((s) => {
                      const isSelected = selectedServiceIds.includes(s.id);
                      return (
                        <div
                          key={s.id}
                          onClick={() => toggleService(s.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                            isSelected
                              ? "border-gold bg-gold-soft/30 text-ink shadow-md"
                              : "border-line bg-bg/50 hover:border-gold/60 text-ink-muted hover:text-ink"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-ink truncate">
                                {s.name}
                              </span>
                              {s.recommended && (
                                <span className="rounded-full bg-gold-soft text-gold text-[9px] font-bold uppercase px-1.5 py-0.2">
                                  Top
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-ink-faint mt-0.5">
                              {s.duration} min
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-display text-sm font-bold text-gold">
                              {formatCOP(s.price)}
                            </span>
                            <div className="flex justify-end mt-1">
                              <span
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isSelected
                                    ? "bg-gold border-gold text-bg"
                                    : "border-line"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 1: Barber / Specialist */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <p className="text-sm text-ink-muted">
                Elige con quién deseas atenderte o selecciona &quot;Cualquiera disponible&quot; para mayor rapidez.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {qualifiedBarbers.map((b) => {
                  const isSelected = draft.barberId === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => {
                        updateDraft({ barberId: b.id });
                        setCurrentStep(2);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                        isSelected
                          ? "border-gold bg-gold-soft/30 shadow-lg"
                          : "border-line bg-bg/50 hover:border-gold/60"
                      }`}
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold/60 shrink-0 relative bg-bg-elevated-2 flex items-center justify-center font-display font-bold text-gold text-xl">
                        {b.photo ? (
                          <Image
                            src={b.photo}
                            alt={b.name}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          b.initials
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-lg font-bold text-ink">
                          {b.name}
                        </h4>
                        <p className="text-xs text-gold uppercase tracking-wider">
                          {b.role}
                        </p>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-gold border-gold text-bg"
                            : "border-line"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Date Selection */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-lg font-bold capitalize text-ink">
                  {currentMonthName}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink hover:border-gold transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink hover:border-gold transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 text-center text-xs font-semibold text-ink-faint uppercase py-2 border-y border-line">
                <span>Lun</span>
                <span>Mar</span>
                <span>Mié</span>
                <span>Jue</span>
                <span>Vie</span>
                <span>Sáb</span>
                <span>Dom</span>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1.5 pt-2">
                {calendarDays.map((c, i) => {
                  const isSelected = draft.dateKey === c.key;
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={!c.isOpen}
                      onClick={() => {
                        updateDraft({
                          dateKey: c.key,
                          dateLabel: formatDateKeyLabel(c.key),
                          time: null,
                        });
                        setCurrentStep(3);
                      }}
                      className={`h-11 rounded-xl flex flex-col items-center justify-center text-sm font-semibold transition-all ${
                        !c.isOpen
                          ? "opacity-25 cursor-not-allowed text-ink-faint"
                          : isSelected
                          ? "bg-gold text-bg shadow-md scale-105 font-bold"
                          : c.isToday
                          ? "border border-gold text-gold hover:bg-gold-soft"
                          : "hover:bg-bg-elevated-2 text-ink hover:text-gold"
                      }`}
                    >
                      <span>{c.day}</span>
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-ink-faint text-center pt-2">
                Horario habitual: Lunes a Sábado de 7:20 a.m. a 8:00 p.m.
              </p>
            </div>
          )}

          {/* STEP 3: Time Slot */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">
                    Horarios Disponibles
                  </h3>
                  <p className="text-xs text-gold">
                    {draft.dateLabel} · Duración: {summary.duracion} min
                  </p>
                </div>
                <div className="text-xs text-ink-muted">
                  Con: <span className="font-semibold text-ink">{selectedBarber?.name}</span>
                </div>
              </div>

              {loadingTimes ? (
                <div className="py-12 text-center text-sm text-ink-muted">
                  <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  Consultando turnos libres en tiempo real...
                </div>
              ) : availableTimes.length === 0 ? (
                <div className="py-12 text-center">
                  <AlertCircle className="w-8 h-8 text-gold mx-auto mb-2 opacity-80" />
                  <p className="text-sm font-semibold text-ink">
                    No hay turnos disponibles para esta fecha con este profesional.
                  </p>
                  <p className="text-xs text-ink-muted mt-1">
                    Por favor selecciona otra fecha o elige &quot;Cualquiera disponible&quot;.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="mt-4 text-xs font-semibold text-gold underline"
                  >
                    ← Cambiar fecha
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {availableTimes.map((t) => {
                    const isSelected = draft.time === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          updateDraft({ time: t });
                          setCurrentStep(4);
                        }}
                        className={`py-3 px-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                          isSelected
                            ? "bg-gold text-bg border-gold shadow-md font-bold"
                            : "border-line bg-bg/60 text-ink hover:border-gold hover:text-gold"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Client Info Form */}
          {currentStep === 4 && (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <p className="text-sm text-ink-muted">
                Ingresa tus datos para confirmar tu cita. Recibirás tu confirmación de inmediato.
              </p>

              {/* Booking Summary Box */}
              <div className="p-4 rounded-xl border border-line bg-bg/60 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Servicio(s):</span>
                  <span className="font-semibold text-ink text-right">{summary.nombre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Barbero / Profesional:</span>
                  <span className="font-semibold text-ink">{selectedBarber?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Fecha y Hora:</span>
                  <span className="font-semibold text-gold">
                    {draft.dateLabel} a las {draft.time}
                  </span>
                </div>
                <div className="flex justify-between border-t border-line pt-2 text-sm">
                  <span className="font-semibold text-ink">Total a pagar:</span>
                  <span className="font-display font-bold text-gold-strong">
                    {summary.etiqueta}
                  </span>
                </div>
              </div>

              {submitError && (
                <div className="p-3 rounded-lg bg-red-900/40 border border-red-500 text-xs text-red-200">
                  {submitError}
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-ink-faint absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre y apellido"
                      value={draft.fullName}
                      onChange={(e) => updateDraft({ fullName: e.target.value })}
                      className="w-full bg-bg border border-line rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-ink-faint absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="Ej: 323 492 8607"
                      value={draft.phone}
                      onChange={(e) => updateDraft({ phone: e.target.value })}
                      className="w-full bg-bg border border-line rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
                    Correo Electrónico (Opcional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-ink-faint absolute left-3 top-3.5" />
                    <input
                      type="email"
                      placeholder="tuemail@ejemplo.com"
                      value={draft.email}
                      onChange={(e) => updateDraft({ email: e.target.value })}
                      className="w-full bg-bg border border-line rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
                    Notas adicionales (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Instrucciones especiales o requerimientos"
                    value={draft.notes}
                    onChange={(e) => updateDraft({ notes: e.target.value })}
                    className="w-full bg-bg border border-line rounded-xl p-3 text-sm text-ink placeholder:text-ink-faint focus:border-gold focus:outline-none resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="gold-cta w-full py-3.5 rounded-full text-sm font-bold uppercase tracking-wider mt-4 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                    <span>Confirmando cita...</span>
                  </>
                ) : (
                  <span>Confirmar Cita</span>
                )}
              </button>
            </form>
          )}

          {/* STEP 5: Success & Confirmation */}
          {currentStep === 5 && (
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-gold-soft border border-gold flex items-center justify-center mx-auto text-gold">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold uppercase text-ink">
                  ¡Cita Agendada con Éxito!
                </h3>
                <p className="text-sm text-ink-muted mt-2 max-w-md mx-auto">
                  Tu turno ha quedado confirmado en nuestro sistema. Te esperamos puntualmente.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-line bg-bg/80 max-w-md mx-auto text-left space-y-3 text-sm">
                <div className="flex justify-between border-b border-line pb-2">
                  <span className="text-ink-muted">Cliente:</span>
                  <span className="font-semibold text-ink">{draft.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-line pb-2">
                  <span className="text-ink-muted">Profesional:</span>
                  <span className="font-semibold text-gold">
                    {confirmedData?.assignedBarberName || selectedBarber?.name}
                  </span>
                </div>
                <div className="flex justify-between border-b border-line pb-2">
                  <span className="text-ink-muted">Servicio:</span>
                  <span className="font-semibold text-ink">{summary.nombre}</span>
                </div>
                <div className="flex justify-between border-b border-line pb-2">
                  <span className="text-ink-muted">Fecha y Hora:</span>
                  <span className="font-semibold text-gold">
                    {draft.dateLabel} a las {draft.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Total a abonar:</span>
                  <span className="font-display font-bold text-gold-strong text-base">
                    {summary.etiqueta}
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Confirmation Trigger */}
              <div className="flex flex-col gap-3 max-w-md mx-auto">
                <a
                  href={`https://wa.me/573234928607?text=${encodeURIComponent(
                    `Hola Quality Barber Shop, acabo de agendar mi cita a nombre de ${draft.fullName} para ${summary.nombre} el ${draft.dateLabel} a las ${draft.time}. ¡Muchas gracias!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Z" />
                  </svg>
                  <span>Enviar mensaje de confirmación por WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    resetDraft();
                    closeBooking();
                  }}
                  className="w-full py-3 rounded-full border border-line text-ink-muted hover:text-ink hover:border-gold transition-colors text-sm font-semibold"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Steps 0 - 3) */}
        {currentStep === 0 && (
          <div className="p-4 border-t border-line bg-bg/80 flex items-center justify-between">
            <div className="text-xs text-ink-muted">
              {summary.servicios.length > 0 ? (
                <span>
                  Seleccionado: <strong className="text-gold">{summary.nombre}</strong> ({summary.duracion} min)
                </span>
              ) : (
                "Selecciona al menos un servicio"
              )}
            </div>

            <button
              type="button"
              disabled={selectedServiceIds.length === 0}
              onClick={() => setCurrentStep(1)}
              className="gold-cta px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuar →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
