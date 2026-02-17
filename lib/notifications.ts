import { Booking } from "@/lib/types";

export async function sendBookingConfirmationEmail(booking: Booking) {
  // Demo-safe fallback. Integrate SMTP/Resend by wiring env vars.
  if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL) {
    console.log("Booking confirmation email (demo):", {
      to: booking.email,
      bookingId: booking.id,
      startTimeISO: booking.startTimeISO
    });
    return;
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL,
      to: booking.email,
      subject: "Booking Confirmed - Daniel's Auto Detailing",
      html: `<p>Your booking is confirmed.</p><p>Date: ${booking.startTimeISO}</p><p>Booking ID: ${booking.id}</p>`
    })
  });
}
