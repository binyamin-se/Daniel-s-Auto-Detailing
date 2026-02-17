import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { markBookingPaidBySession } from "@/lib/bookings";
import { sendBookingConfirmationEmail } from "@/lib/notifications";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const signature = (await headers()).get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 400 });
  }

  const payload = await request.text();

  try {
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const booking = markBookingPaidBySession(session.id);
      if (booking) await sendBookingConfirmationEmail(booking);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid webhook signature." },
      { status: 400 }
    );
  }
}
