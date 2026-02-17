import { NextResponse } from "next/server";
import { getBookingById } from "@/lib/bookings";

type Params = {
  params: Promise<{ id: string }>;
};

function toIcsDate(iso: string) {
  return iso.replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  const booking = getBookingById(id);

  if (!booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//DanielsAutoDetailing//Booking//EN
BEGIN:VEVENT
UID:${booking.id}
DTSTAMP:${toIcsDate(new Date().toISOString())}
DTSTART:${toIcsDate(booking.startTimeISO)}
DTEND:${toIcsDate(booking.endTimeISO)}
SUMMARY:Daniel's Auto Detailing Booking
DESCRIPTION:${booking.serviceType} appointment
LOCATION:${booking.location}
END:VEVENT
END:VCALENDAR`;

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar",
      "Content-Disposition": `attachment; filename="booking-${booking.id}.ics"`
    }
  });
}
