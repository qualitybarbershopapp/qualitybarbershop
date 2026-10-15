import fs from "fs";
import path from "path";
import { parseTimeToMinutes } from "./booking-utils";
import { supabase, isSupabaseConfigured } from "./supabase";

export interface Appointment {
  id: string;
  serviceId: string;
  extraServiceIds?: string[];
  serviceName: string;
  servicePrice: number;
  priceLabel: string;
  quantity: number;
  duration: number; // minutes
  barberName: string;
  barberId: string;
  dateKey: string; // "YYYY-MM-DD"
  dateLabel: string;
  time: string; // "10:20 a.m."
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
  createdAt: string;
  status: "confirmed" | "cancelled";
}

const memoryStore: Appointment[] = [];

function getStorageFilePath(): string | null {
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    return path.join(dataDir, "appointments.json");
  } catch {
    return null;
  }
}

function getLocalAppointments(): Appointment[] {
  const filePath = getStorageFilePath();
  if (filePath && fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(raw);
    } catch {
      return memoryStore;
    }
  }
  return memoryStore;
}

function saveLocalAppointment(appointment: Appointment): void {
  const all = getLocalAppointments();
  all.push(appointment);

  const filePath = getStorageFilePath();
  if (filePath) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(all, null, 2), "utf-8");
    } catch {
      memoryStore.push(appointment);
    }
  } else {
    memoryStore.push(appointment);
  }
}

export async function getAllAppointments(): Promise<Appointment[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .neq("status", "cancelled");

      if (!error && data) {
        return data.map((row: any) => ({
          id: row.id,
          serviceId: row.service_id,
          extraServiceIds: row.extra_service_ids || [],
          serviceName: row.service_name,
          servicePrice: Number(row.service_price),
          priceLabel: row.price_label,
          quantity: row.quantity || 1,
          duration: Number(row.duration),
          barberName: row.barber_name,
          barberId: row.barber_id,
          dateKey: row.date_key,
          dateLabel: row.date_label,
          time: row.time,
          fullName: row.full_name,
          email: row.email || "",
          phone: row.phone,
          notes: row.notes || "",
          createdAt: row.created_at,
          status: row.status || "confirmed",
        }));
      }
      console.warn("Supabase query error, using local storage:", error?.message);
    } catch (e) {
      console.warn("Supabase fetch failed, fallback to local:", e);
    }
  }

  return getLocalAppointments();
}

export async function saveAppointment(appointment: Appointment): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("appointments").insert({
        id: appointment.id,
        service_id: appointment.serviceId,
        extra_service_ids: appointment.extraServiceIds || [],
        service_name: appointment.serviceName,
        service_price: appointment.servicePrice,
        price_label: appointment.priceLabel,
        quantity: appointment.quantity,
        duration: appointment.duration,
        barber_name: appointment.barberName,
        barber_id: appointment.barberId,
        date_key: appointment.dateKey,
        date_label: appointment.dateLabel,
        time: appointment.time,
        full_name: appointment.fullName,
        email: appointment.email,
        phone: appointment.phone,
        notes: appointment.notes,
        created_at: appointment.createdAt,
        status: appointment.status,
      });

      if (!error) {
        return;
      }
      console.warn("Supabase insert error, saving locally:", error.message);
    } catch (e) {
      console.warn("Supabase insert failed, saving locally:", e);
    }
  }

  saveLocalAppointment(appointment);
}

export async function isSlotAvailable(
  dateKey: string,
  barberId: string,
  timeStr: string,
  durationMinutes: number
): Promise<boolean> {
  const all = await getAllAppointments();
  const appointments = all.filter(
    (a) => a.dateKey === dateKey && a.status !== "cancelled"
  );

  const reqStart = parseTimeToMinutes(timeStr);
  const reqEnd = reqStart + durationMinutes;

  for (const app of appointments) {
    if (barberId !== "cualquiera" && app.barberId !== "cualquiera" && app.barberId !== barberId) {
      continue;
    }

    const appStart = parseTimeToMinutes(app.time);
    const appEnd = appStart + app.duration;

    if (reqStart < appEnd && reqEnd > appStart) {
      return false;
    }
  }

  return true;
}
