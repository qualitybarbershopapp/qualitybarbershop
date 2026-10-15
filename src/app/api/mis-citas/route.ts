import { NextRequest, NextResponse } from "next/server";
import { getAllAppointments } from "@/lib/storage";
import { getBogotaNow, parseTimeToMinutes } from "@/lib/booking-utils";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { telefono = "", email = "" } = await request.json();

    const cleanTel = telefono.replace(/\D/g, "");
    const cleanMail = email.trim().toLowerCase();

    if (!cleanTel && !cleanMail) {
      return NextResponse.json(
        { error: "Debes ingresar tu teléfono o correo electrónico." },
        { status: 400 }
      );
    }

    const { dateKey: todayKey, minutes: currentMinutes } = getBogotaNow();
    const all = getAllAppointments();

    const matched = all.filter((app) => {
      const matchTel =
        cleanTel && app.phone.replace(/\D/g, "").includes(cleanTel);
      const matchMail =
        cleanMail && app.email.trim().toLowerCase() === cleanMail;
      return matchTel || matchMail;
    });

    const citas = matched.map((app) => {
      let pasada = false;
      if (app.dateKey < todayKey) {
        pasada = true;
      } else if (app.dateKey === todayKey) {
        const appMin = parseTimeToMinutes(app.time);
        if (appMin < currentMinutes) {
          pasada = true;
        }
      }

      return {
        ...app,
        pasada,
      };
    });

    // Sort: upcoming first (earliest to latest), then past (latest to earliest)
    citas.sort((a, b) => {
      if (a.pasada !== b.pasada) {
        return a.pasada ? 1 : -1;
      }
      return `${b.dateKey} ${b.time}`.localeCompare(`${a.dateKey} ${a.time}`);
    });

    return NextResponse.json({ citas });
  } catch (error) {
    console.error("Error en /api/mis-citas:", error);
    return NextResponse.json(
      { error: "No se pudieron consultar tus citas. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
