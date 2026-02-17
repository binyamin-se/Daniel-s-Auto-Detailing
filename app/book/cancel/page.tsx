import Link from "next/link";

export default function BookingCancelPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-white">
        <h1 className="text-3xl font-semibold">Booking Not Completed</h1>
        <p className="mt-3 text-gray-300">No worries. Your slot was not confirmed because deposit payment was cancelled.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/book" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black">
            Try Again
          </Link>
          <Link href="/contact" className="rounded-full border border-white/20 px-5 py-2 text-sm text-white">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
