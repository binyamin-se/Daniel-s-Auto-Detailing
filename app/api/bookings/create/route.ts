import { NextResponse } from "next/server";
import { createPendingBooking } from "@/lib/bookings";
import { ServiceCategory } from "@/lib/types";

export async function POST(request: Request) {
  const body = await request.json();

  const required = [
    "customerName",
    "phone",
    "email",
    "vehicleYearMakeModel",
    "serviceType",
    "location",
    "startTimeISO"
  ];

  for (const key of required) {
    if (!body[key]) {
      return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
    }
  }

  try {
    const booking = createPendingBooking({
      customerName: body.customerName,
      phone: body.phone,
      email: body.email,
      vehicleYearMakeModel: body.vehicleYearMakeModel,
      serviceType: body.serviceType as ServiceCategory,
      location: body.location,
      notes: body.notes || "",
      startTimeISO: body.startTimeISO
    });

    return NextResponse.json({ bookingId: booking.id, depositAmountCents: booking.depositAmountCents });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create booking." },
      { status: 409 }
    );
  }
}
