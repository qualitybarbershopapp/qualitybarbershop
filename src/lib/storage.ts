import fs from "fs";
import path from "path";
import { parseTimeToMinutes, BLOCK_DURATION_MINUTES } from "./booking-utils";

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

export function getAllAppointments(): Appointment[] {
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

export function saveAppointment(appointment: Appointment): void {
  const all = getAllAppointments();
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

export function isSlotAvailable(
  dateKey: string,
  barberId: string,
  timeStr: string,
  durationMinutes: number
): boolean {
  const appointments = getAllAppointments().filter(
    (a) => a.dateKey === dateKey && a.status !== "cancelled"
  );

  const reqStart = parseTimeToMinutes(timeStr);
  const reqEnd = reqStart + durationMinutes;

  for (const app of appointments) {
    // If specific barber, only conflict if same barber
    if (barberId !== "cualquiera" && app.barberId !== "cualquiera" && app.barberId !== barberId) {
      continue;
    }

    const appStart = parseTimeToMinutes(app.time);
    const appEnd = appStart + app.duration;

    // Overlap condition
    if (reqStart < appEnd && reqEnd > appStart) {
      return false;
    }
  }

  return true;
}
