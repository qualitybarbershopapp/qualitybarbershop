"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BARBERS } from "@/data/barbershop-data";

export interface BookingDraft {
  serviceId: string | null;
  extraIds: string[];
  quantity: number;
  barberId: string | null;
  dateKey: string | null;
  dateLabel: string | null;
  time: string | null;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}

export interface SavedClientData {
  fullName: string;
  email: string;
  phone: string;
}

const DEFAULT_DRAFT: BookingDraft = {
  serviceId: null,
  extraIds: [],
  quantity: 1,
  barberId: null,
  dateKey: null,
  dateLabel: null,
  time: null,
  fullName: "",
  email: "",
  phone: "",
  notes: "",
};

const DRAFT_STORAGE_KEY = "qbs-booking-draft";
const CLIENT_STORAGE_KEY = "qbs-datos-cliente";

interface BookingContextType {
  isBookingOpen: boolean;
  openBooking: (initial?: { serviceId?: string; barberId?: string }) => void;
  closeBooking: () => void;
  isMisCitasOpen: boolean;
  openMisCitas: () => void;
  closeMisCitas: () => void;
  isCompartirOpen: boolean;
  openCompartir: () => void;
  closeCompartir: () => void;
  draft: BookingDraft;
  updateDraft: (updates: Partial<BookingDraft>) => void;
  resetDraft: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  savedClient: SavedClientData | null;
  saveClientData: (data: SavedClientData) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMisCitasOpen, setIsMisCitasOpen] = useState(false);
  const [isCompartirOpen, setIsCompartirOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [draft, setDraftState] = useState<BookingDraft>(DEFAULT_DRAFT);
  const [savedClient, setSavedClient] = useState<SavedClientData | null>(null);

  // Load saved client and draft on mount
  useEffect(() => {
    try {
      const clientStr = localStorage.getItem(CLIENT_STORAGE_KEY);
      if (clientStr) {
        const parsed = JSON.parse(clientStr);
        setSavedClient(parsed);
        setDraftState((prev) => ({
          ...prev,
          fullName: parsed.fullName || "",
          email: parsed.email || "",
          phone: parsed.phone || "",
        }));
      }

      const draftStr = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (draftStr) {
        const parsedDraft = JSON.parse(draftStr);
        setDraftState((prev) => ({
          ...prev,
          ...parsedDraft,
        }));
      }
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }
  }, []);

  const updateDraft = (updates: Partial<BookingDraft>) => {
    setDraftState((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Error saving draft:", e);
      }
      return next;
    });
  };

  const saveClientData = (data: SavedClientData) => {
    setSavedClient(data);
    try {
      localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Error saving client data:", e);
    }
  };

  const resetDraft = () => {
    setDraftState({
      ...DEFAULT_DRAFT,
      fullName: savedClient?.fullName || "",
      email: savedClient?.email || "",
      phone: savedClient?.phone || "",
    });
    setCurrentStep(0);
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {}
  };

  const openBooking = (initial?: { serviceId?: string; barberId?: string }) => {
    if (initial) {
      const updates: Partial<BookingDraft> = {};
      if (initial.serviceId) {
        updates.serviceId = initial.serviceId;
        setCurrentStep(1); // Jump to barber selection
      }
      if (initial.barberId) {
        updates.barberId = initial.barberId;
        if (!initial.serviceId && !draft.serviceId) {
          setCurrentStep(0); // Choose service first
        } else {
          setCurrentStep(2); // Jump to date selection
        }
      }
      updateDraft(updates);
    }
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  const openMisCitas = () => setIsMisCitasOpen(true);
  const closeMisCitas = () => setIsMisCitasOpen(false);

  const openCompartir = () => setIsCompartirOpen(true);
  const closeCompartir = () => setIsCompartirOpen(false);

  return (
    <BookingContext.Provider
      value={{
        isBookingOpen,
        openBooking,
        closeBooking,
        isMisCitasOpen,
        openMisCitas,
        closeMisCitas,
        isCompartirOpen,
        openCompartir,
        closeCompartir,
        draft,
        updateDraft,
        resetDraft,
        currentStep,
        setCurrentStep,
        savedClient,
        saveClientData,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
