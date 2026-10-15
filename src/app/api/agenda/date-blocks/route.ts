import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const barberId = searchParams.get("barberId");

    // Returns dates completely blocked or on holiday (YYYY-MM-DD)
    const blocks: string[] = [];

    return NextResponse.json({ blocks });
  } catch (error) {
    console.error("Error en /api/agenda/date-blocks:", error);
    return NextResponse.json({ blocks: [] });
  }
}
