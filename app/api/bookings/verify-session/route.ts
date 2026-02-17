import { NextResponse } from "next/server";
import { markBookingPaidById } from "@/lib/bookings";
import { sendBookingConfirmationEmail } from "@/lib/notifications";
import { getStripe } from "@/lib/stripe";

export async function GET(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured." }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Payment not completed." }, { status: 402 });
  }

  const bookingId = session.metadata?.bookingId;
  if (!bookingId) {
    return NextResponse.json({ error: "Booking metadata missing." }, { status: 404 });
  }

  const booking = markBookingPaidById(bookingId);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  await sendBookingConfirmationEmail(booking);
  return NextResponse.json({ booking });
}
