import { NextResponse } from "next/server";
import { attachStripeSession, getBookingById } from "@/lib/bookings";
import { getSiteUrl, getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  const body = await request.json();
  const bookingId = body.bookingId as string;

  if (!bookingId) {
    return NextResponse.json({ error: "Missing bookingId." }, { status: 400 });
  }

  const booking = getBookingById(bookingId);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  if (booking.status === "paid") {
    return NextResponse.json({ error: "Booking already paid." }, { status: 409 });
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${getSiteUrl()}/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getSiteUrl()}/book/cancel`,
    payment_method_types: ["card"],
    customer_email: booking.email,
    metadata: {
      bookingId: booking.id
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: booking.depositAmountCents,
          product_data: {
            name: `${booking.serviceType} booking deposit`,
            description: "Deposit goes toward your service total."
          }
        }
      }
    ]
  });

  attachStripeSession(booking.id, session.id);
  return NextResponse.json({ url: session.url });
}
