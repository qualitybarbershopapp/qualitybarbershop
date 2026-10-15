import { BARBERS, DAY_LABELS, SCHEDULE } from "../data/barbershop-data";

export const BLOCK_DURATION_MINUTES = 10;

export function formatScheduleTime(hour: number, minute: number): string {
  const period = hour >= 12 ? "p.m." : "a.m.";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${String(displayHour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
}

export function formatTimeMinutes(minutesTotal: number): string {
  const hour = Math.floor(minutesTotal / 60);
  const minute = minutesTotal % 60;
  return formatScheduleTime(hour, minute);
}

export function parseTimeToMinutes(timeStr: string): number {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(a\.m\.|p\.m\.)$/i);
  if (!match) return 0;
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = match[3].toLowerCase();
  if (period === "p.m." && hour < 12) hour += 12;
  if (period === "a.m." && hour === 12) hour = 0;
  return hour * 60 + minute;
}

export function getBogotaNow(): { dateKey: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const getVal = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  const dateKey = `${getVal("year")}-${getVal("month")}-${getVal("day")}`;
  const minutes = Number(getVal("hour")) * 60 + Number(getVal("minute"));
  return { dateKey, minutes };
}

export function formatDateKeyLabel(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const dayName = DAY_LABELS[date.getDay()];
  const monthName = date.toLocaleDateString("es-CO", { month: "long" });
  return `${dayName} ${d} de ${monthName}`;
}

export function getBarberSchedule(barberId?: string | null) {
  const barber = barberId ? BARBERS.find((b) => b.id === barberId) : null;
  const openHour = barber?.horario?.openHour ?? SCHEDULE.openHour;
  const openMinute = barber?.horario?.openMinute ?? SCHEDULE.openMinute;
  return {
    openMinutes: openHour * 60 + openMinute,
    closeMinutes: SCHEDULE.closeHour * 60 + SCHEDULE.closeMinute,
  };
}

export function getBlockGridTimes(
  dateKey: string,
  options?: { barberId?: string | null; incluirPasadas?: boolean }
): string[] {
  const { dateKey: todayKey, minutes: currentMinutes } = getBogotaNow();
  const isToday = dateKey === todayKey && !options?.incluirPasadas;
  const { openMinutes, closeMinutes } = getBarberSchedule(options?.barberId);

  const times: string[] = [];
  for (let m = openMinutes; m + BLOCK_DURATION_MINUTES <= closeMinutes; m += BLOCK_DURATION_MINUTES) {
    if (isToday && m <= currentMinutes) {
      continue;
    }
    times.push(formatTimeMinutes(m));
  }
  return times;
}

export function getMonthCalendar(year: number, month: number) {
  const today = new Date();
  const formatStr = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  const todayStr = formatStr(today);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
  const maxDateStr = formatStr(maxDate);

  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday as 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];

  // Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, daysInPrevMonth - i);
    const key = formatStr(d);
    cells.push({
      key,
      day: d.getDate(),
      isCurrentMonth: false,
      isToday: key === todayStr,
      isPast: key < todayStr,
      isOpen: false,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const key = formatStr(d);
    const isPast = key < todayStr;
    const isBusinessDay = SCHEDULE.openDays.includes(d.getDay());
    const isOpen = !isPast && key <= maxDateStr && isBusinessDay;

    cells.push({
      key,
      day,
      isCurrentMonth: true,
      isToday: key === todayStr,
      isPast,
      isOpen,
    });
  }

  // Next month leading days to complete full 7-column rows (up to 35 or 42)
  const remaining = (7 - (cells.length % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    const key = formatStr(d);
    cells.push({
      key,
      day: i,
      isCurrentMonth: false,
      isToday: key === todayStr,
      isPast: key < todayStr,
      isOpen: false,
    });
  }

  return cells;
}

export function formatWhatsAppPhone(phone: string): string {
  const clean = phone.replace(/\D/g, "");
  return clean.startsWith("57") ? clean : `57${clean}`;
}
