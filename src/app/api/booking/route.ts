import { NextRequest, NextResponse } from "next/server";
import { getBlockGridTimes, parseTimeToMinutes, getBogotaNow } from "@/lib/booking-utils";
import { BARBERS, equipoParaServicios } from "@/data/barbershop-data";
import {
  getAllAppointments,
  saveAppointment,
  isSlotAvailable,
  Appointment,
} from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateKey = searchParams.get("dateKey");
    const barberId = searchParams.get("barberId");
    const duration = parseInt(searchParams.get("duration") || "30", 10);
    const servicios = searchParams.get("servicios")?.split(",").filter(Boolean) || [];

    if (!dateKey || !barberId) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos (dateKey, barberId)" },
        { status: 400 }
      );
    }

    const grid = getBlockGridTimes(dateKey, { barberId });

    // Filter slots where full duration fits without overlap
    const availableTimes = grid.filter((time) => {
      return isSlotAvailable(dateKey, barberId, time, duration);
    });

    return NextResponse.json({ availableTimes });
  } catch (error) {
    console.error("Error en GET /api/booking:", error);
    return NextResponse.json(
      { error: "Error interno al consultar horarios disponibles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      serviceId,
      extraServiceIds = [],
      serviceName,
      servicePrice,
      priceLabel,
      quantity = 1,
      duration,
      barberName,
      barberId,
      dateKey,
      dateLabel,
      time,
      fullName,
      email,
      phone,
      notes = "",
    } = body;

    if (!serviceId || !dateKey || !time || !fullName || !phone || !barberId) {
      return NextResponse.json(
        { error: "Todos los campos obligatorios deben estar presentes" },
        { status: 400 }
      );
    }

    // Determine assigned barber if "cualquiera"
    let assignedBarberId = barberId;
    let assignedBarberName = barberName;

    if (barberId === "cualquiera") {
      const candidates = equipoParaServicios([serviceId, ...extraServiceIds]);
      const availableCandidate = candidates.find((c) =>
        isSlotAvailable(dateKey, c.id, time, duration * quantity)
      );

      if (availableCandidate) {
        assignedBarberId = availableCandidate.id;
        assignedBarberName = availableCandidate.name;
      } else if (candidates.length > 0) {
        assignedBarberId = candidates[0].id;
        assignedBarberName = candidates[0].name;
      }
    }

    // Check collision
    if (!isSlotAvailable(dateKey, assignedBarberId, time, duration * quantity)) {
      return NextResponse.json(
        { error: "El horario seleccionado acaba de ser reservado. Por favor elige otro." },
        { status: 409 }
      );
    }

    const newAppointment: Appointment = {
      id: `qbs-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      serviceId,
      extraServiceIds,
      serviceName,
      servicePrice,
      priceLabel,
      quantity,
      duration: duration * quantity,
      barberName: assignedBarberName,
      barberId: assignedBarberId,
      dateKey,
      dateLabel,
      time,
      fullName,
      email,
      phone,
      notes,
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };

    saveAppointment(newAppointment);

    return NextResponse.json({
      ok: true,
      assignedBarberName,
      appointmentId: newAppointment.id,
    });
  } catch (error) {
    console.error("Error en POST /api/booking:", error);
    return NextResponse.json(
      { error: "Error al procesar la reserva. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
