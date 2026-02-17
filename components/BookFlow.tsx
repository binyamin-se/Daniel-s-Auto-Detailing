"use client";

import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { motion } from "framer-motion";
import { ServiceCategory } from "@/lib/types";

type Slot = { startISO: string; endISO: string };

const services: ServiceCategory[] = ["Detailing", "Ceramic", "Tint", "Membership"];

export function BookFlow() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleYearMakeModel, setVehicleYearMakeModel] = useState("");
  const [serviceType, setServiceType] = useState<ServiceCategory>("Detailing");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [depositAmountCents, setDepositAmountCents] = useState(5000);

  const dateKey = useMemo(() => {
    if (!date) return "";
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, [date]);

  useEffect(() => {
    if (!dateKey) return;
    setLoading(true);
    setError("");
    setSelectedSlot(null);
    fetch(`/api/availability?date=${dateKey}`)
      .then((res) => res.json())
      .then((data) => setSlots(data.availableSlots || []))
      .catch(() => setError("Could not load availability."))
      .finally(() => setLoading(false));
  }, [dateKey]);

  const slotLabel = (slot: Slot) =>
    new Date(slot.startISO).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  const startCheckout = async () => {
    setError("");
    if (!selectedSlot) return setError("Select a time slot.");
    if (!customerName || !phone || !email || !vehicleYearMakeModel || !location) {
      return setError("Please fill all required fields.");
    }

    try {
      const createRes = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          email,
          vehicleYearMakeModel,
          serviceType,
          location,
          notes,
          startTimeISO: selectedSlot.startISO
        })
      });

      const created = await createRes.json();
      if (!createRes.ok) throw new Error(created.error || "Could not create booking.");
      setDepositAmountCents(created.depositAmountCents);

      const stripeRes = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: created.bookingId })
      });
      const stripeData = await stripeRes.json();
      if (!stripeRes.ok || !stripeData.url) throw new Error(stripeData.error || "Could not create payment session.");
      window.location.href = stripeData.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to continue.");
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-semibold text-white">Book Now</h1>
        <p className="mt-3 text-gray-300">
          Select an available slot, complete your info, and pay the deposit to confirm your booking.
        </p>
        <p className="mt-2 text-sm text-gray-400">Insured • 5-star rated • Mobile service MD/VA/DC</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xl font-semibold text-white">1) Pick Date</h2>
          <div className="mt-4 rounded-xl border border-white/10 bg-charcoal/70 p-4">
            <DayPicker
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={{ before: new Date() }}
              className="text-white"
            />
          </div>
          <h3 className="mt-5 text-lg font-medium text-white">2) Pick Available Time</h3>
          {loading ? <p className="mt-2 text-sm text-gray-400">Loading slots...</p> : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {slots.map((slot) => (
              <button
                key={slot.startISO}
                onClick={() => setSelectedSlot(slot)}
                className={`rounded-full border px-3 py-2 text-sm ${
                  selectedSlot?.startISO === slot.startISO
                    ? "border-white bg-white text-black"
                    : "border-white/20 text-gray-200"
                }`}
              >
                {slotLabel(slot)}
              </button>
            ))}
            {!loading && slots.length === 0 ? <p className="text-sm text-gray-400">No slots available for this date.</p> : null}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xl font-semibold text-white">3) Booking Details</h2>
          <div className="mt-4 space-y-3">
            <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Full name" className="w-full rounded-xl border border-white/20 bg-charcoal/80 px-4 py-3 text-sm text-white" />
            <div className="grid gap-3 sm:grid-cols-2">
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="rounded-xl border border-white/20 bg-charcoal/80 px-4 py-3 text-sm text-white" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-xl border border-white/20 bg-charcoal/80 px-4 py-3 text-sm text-white" />
            </div>
            <input value={vehicleYearMakeModel} onChange={(e) => setVehicleYearMakeModel(e.target.value)} placeholder="Vehicle year / make / model" className="w-full rounded-xl border border-white/20 bg-charcoal/80 px-4 py-3 text-sm text-white" />
            <select value={serviceType} onChange={(e) => setServiceType(e.target.value as ServiceCategory)} className="w-full rounded-xl border border-white/20 bg-charcoal/80 px-4 py-3 text-sm text-white">
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Service location (address / zip)" className="w-full rounded-xl border border-white/20 bg-charcoal/80 px-4 py-3 text-sm text-white" />
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Notes (optional)" className="w-full rounded-xl border border-white/20 bg-charcoal/80 px-4 py-3 text-sm text-white" />
          </div>

          <div className="mt-5 rounded-xl border border-white/15 bg-charcoal/60 p-4">
            <div className="flex items-center justify-between text-sm text-gray-200">
              <span>Required deposit</span>
              <span className="font-semibold text-white">${(depositAmountCents / 100).toFixed(2)}</span>
            </div>
            <p className="mt-2 text-xs text-gray-400">Deposit goes toward your service total.</p>
          </div>

          {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}

          <button
            onClick={startCheckout}
            className="mt-5 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            Pay Deposit To Confirm
          </button>
        </motion.div>
      </div>
    </section>
  );
}
