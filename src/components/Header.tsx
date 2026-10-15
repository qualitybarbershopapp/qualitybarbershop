"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CalendarDays, Menu, X, Share2 } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { BUSINESS } from "@/data/barbershop-data";

export default function Header() {
  const { openBooking, openMisCitas, openCompartir } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur-md border-b border-line">
      {/* Top micro bar */}
      <div className="hidden md:flex justify-center gap-6 text-[11px] uppercase tracking-[0.18em] text-ink-faint py-1.5 border-b border-line">
        <span>{BUSINESS.city}</span>
        <span className="text-line">|</span>
        <span>Abierto hoy · 7:20 a.m. – 8:00 p.m.</span>
      </div>

      <nav className="flex items-center justify-between gap-2 px-5 md:px-8 py-3.5 max-w-[1180px] mx-auto">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="min-[760px]:hidden w-10 h-10 shrink-0 rounded-full border border-line flex items-center justify-center text-ink hover:border-gold transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Brand Logo */}
        <a href="#top" className="group">
          <div className="flex items-center gap-3">
            <div className="transition-transform duration-500 ease-out group-hover:rotate-[18deg]">
              <Image
                src="/logo-mark.png"
                alt={BUSINESS.name}
                width={44}
                height={44}
                className="rounded-full border border-gold/40"
                priority
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
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden min-[760px]:flex gap-8 text-sm text-ink-muted">
          <a href="#servicios" className="nav-link transition-colors hover:text-ink">
            Servicios
          </a>
          <a href="#productos" className="nav-link transition-colors hover:text-ink">
            Productos
          </a>
          <a href="#barberos" className="nav-link transition-colors hover:text-ink">
            Barberos
          </a>
          <a href="#nosotros" className="nav-link transition-colors hover:text-ink">
            Nosotros
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={openMisCitas}
            title="Mis citas"
            aria-label="Mis citas"
            className="inline-flex items-center gap-1.5 rounded-full border border-line hover:border-gold px-3.5 py-2 text-sm font-medium text-ink-muted hover:text-ink whitespace-nowrap transition-colors"
          >
            <CalendarDays className="w-4 h-4 shrink-0 text-gold" />
            <span className="hidden min-[560px]:inline">Mis citas</span>
          </button>

          <button
            type="button"
            onClick={openCompartir}
            title="Compartir"
            aria-label="Compartir"
            className="inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-full border border-gold bg-gold-soft text-gold transition-colors hover:brightness-125"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => openBooking()}
            className="gold-cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap"
          >
            Reservar
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="min-[760px]:hidden border-t border-line bg-bg/95 backdrop-blur-md px-6 py-4 flex flex-col gap-3">
          <a
            href="#servicios"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-base text-ink hover:text-gold transition-colors"
          >
            Servicios
          </a>
          <a
            href="#productos"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-base text-ink hover:text-gold transition-colors"
          >
            Productos
          </a>
          <a
            href="#barberos"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-base text-ink hover:text-gold transition-colors"
          >
            Barberos
          </a>
          <a
            href="#nosotros"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-base text-ink hover:text-gold transition-colors"
          >
            Nosotros
          </a>
        </div>
      )}
    </header>
  );
}
