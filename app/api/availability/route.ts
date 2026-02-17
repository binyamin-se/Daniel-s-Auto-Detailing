import { NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/bookings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Missing date query parameter." }, { status: 400 });
  }

  const availableSlots = getAvailableSlots(date);
  return NextResponse.json({ availableSlots });
}
