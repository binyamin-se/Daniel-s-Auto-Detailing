import Link from "next/link";
import { sendBookingConfirmationEmail } from "@/lib/notifications";
import { getBookingById, markBookingPaidById } from "@/lib/bookings";
import { getStripe } from "@/lib/stripe";

type PageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function BookingSuccessPage({ searchParams }: PageProps) {
  const { session_id } = await searchParams;

  if (!session_id || !process.env.STRIPE_SECRET_KEY) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-white">
        <h1 className="text-3xl font-semibold">Booking confirmation unavailable</h1>
        <p className="mt-3 text-gray-300">Missing session information. Please contact us.</p>
      </section>
    );
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(session_id);
  const bookingId = session.metadata?.bookingId;

  if (!bookingId || session.payment_status !== "paid") {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-white">
        <h1 className="text-3xl font-semibold">Payment pending</h1>
        <p className="mt-3 text-gray-300">Your payment has not completed yet.</p>
      </section>
    );
  }

  const booking = markBookingPaidById(bookingId) ?? getBookingById(bookingId);
  if (!booking) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-white">
        <h1 className="text-3xl font-semibold">Booking not found</h1>
      </section>
    );
  }

  await sendBookingConfirmationEmail(booking);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-white">
        <h1 className="text-3xl font-semibold">Booking Confirmed</h1>
        <p className="mt-3 text-gray-300">Your deposit was received and your slot is secured.</p>
        <div className="mt-5 space-y-2 text-sm text-gray-200">
          <p>Service: {booking.serviceType}</p>
          <p>Date/Time: {new Date(booking.startTimeISO).toLocaleString()}</p>
          <p>Location: {booking.location}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`/api/bookings/${booking.id}/ics`}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black"
          >
            Add to Calendar (.ics)
          </a>
          <Link href="/" className="rounded-full border border-white/20 px-5 py-2 text-sm text-white">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
