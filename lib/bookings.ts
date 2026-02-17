import { Booking, ServiceCategory } from "@/lib/types";

type InternalBooking = Booking & { expiresAt?: number };

export const BUSINESS_HOURS = {
  startHour: 9,
  endHour: 18,
  slotMinutes: 60,
  bufferMinutes: 15
};

export const ADMIN_BLOCKED_SLOTS = [
  { startISO: "2026-02-20T12:00:00.000Z", endISO: "2026-02-20T18:00:00.000Z" },
  { startISO: "2026-02-22T14:00:00.000Z", endISO: "2026-02-22T17:00:00.000Z" }
];

const DEPOSIT_BY_SERVICE: Record<ServiceCategory, number> = {
  Detailing: 5000,
  Ceramic: 5000,
  Tint: 5000,
  Membership: 2500
};

const STORE = globalThis as typeof globalThis & { __bookingsStore?: Map<string, InternalBooking> };
const bookingsStore = STORE.__bookingsStore ?? new Map<string, InternalBooking>();
STORE.__bookingsStore = bookingsStore;

function toDate(dateLike: string) {
  return new Date(dateLike);
}

function sameDay(date: Date, targetDateStr: string) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}` === targetDateStr;
}

function overlaps(startA: Date, endA: Date, startB: Date, endB: Date) {
  return startA < endB && startB < endA;
}

function cleanupExpiredPending() {
  const now = Date.now();
  for (const [id, booking] of bookingsStore.entries()) {
    if (booking.status === "pending" && booking.expiresAt && booking.expiresAt < now) {
      bookingsStore.delete(id);
    }
  }
}

export function getBookingById(id: string) {
  cleanupExpiredPending();
  return bookingsStore.get(id);
}

export function listBookings() {
  cleanupExpiredPending();
  return Array.from(bookingsStore.values());
}

function getBusyRangesForDate(dateStr: string) {
  cleanupExpiredPending();

  const paidOrPending = listBookings().filter((booking) => {
    if (booking.status === "cancelled") return false;
    return sameDay(toDate(booking.startTimeISO), dateStr);
  });

  const blocked = ADMIN_BLOCKED_SLOTS.filter((slot) => sameDay(toDate(slot.startISO), dateStr));

  return [
    ...paidOrPending.map((booking) => ({
      start: toDate(booking.startTimeISO),
      end: toDate(booking.endTimeISO)
    })),
    ...blocked.map((slot) => ({
      start: toDate(slot.startISO),
      end: toDate(slot.endISO)
    }))
  ];
}

export function getAvailableSlots(dateStr: string) {
  const baseDate = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(baseDate.getTime())) return [];

  const busyRanges = getBusyRangesForDate(dateStr);
  const slots: Array<{ startISO: string; endISO: string }> = [];

  for (let hour = BUSINESS_HOURS.startHour; hour < BUSINESS_HOURS.endHour; hour += 1) {
    const start = new Date(baseDate);
    start.setHours(hour, 0, 0, 0);
    const end = new Date(start.getTime() + BUSINESS_HOURS.slotMinutes * 60_000);
    const endWithBuffer = new Date(end.getTime() + BUSINESS_HOURS.bufferMinutes * 60_000);

    const isBusy = busyRanges.some((range) => overlaps(start, endWithBuffer, range.start, range.end));
    if (!isBusy) {
      slots.push({ startISO: start.toISOString(), endISO: end.toISOString() });
    }
  }

  return slots;
}

type CreateBookingInput = {
  customerName: string;
  phone: string;
  email: string;
  vehicleYearMakeModel: string;
  serviceType: ServiceCategory;
  location: string;
  notes?: string;
  startTimeISO: string;
};

export function createPendingBooking(input: CreateBookingInput) {
  cleanupExpiredPending();

  const start = toDate(input.startTimeISO);
  const end = new Date(start.getTime() + BUSINESS_HOURS.slotMinutes * 60_000);
  const dateStr = input.startTimeISO.slice(0, 10);

  const slotAvailable = getAvailableSlots(dateStr).some((slot) => slot.startISO === start.toISOString());
  if (!slotAvailable) {
    throw new Error("Selected time slot is no longer available.");
  }

  const id = crypto.randomUUID();
  const booking: InternalBooking = {
    id,
    customerName: input.customerName,
    phone: input.phone,
    email: input.email,
    vehicleYearMakeModel: input.vehicleYearMakeModel,
    serviceType: input.serviceType,
    location: input.location,
    notes: input.notes,
    startTimeISO: start.toISOString(),
    endTimeISO: end.toISOString(),
    depositAmountCents: DEPOSIT_BY_SERVICE[input.serviceType] ?? 5000,
    status: "pending",
    createdAt: new Date().toISOString(),
    expiresAt: Date.now() + 20 * 60_000
  };

  bookingsStore.set(id, booking);
  return booking;
}

export function attachStripeSession(bookingId: string, sessionId: string) {
  const booking = bookingsStore.get(bookingId);
  if (!booking) throw new Error("Booking not found.");
  booking.stripeSessionId = sessionId;
  bookingsStore.set(bookingId, booking);
  return booking;
}

export function markBookingPaidBySession(sessionId: string) {
  for (const [id, booking] of bookingsStore.entries()) {
    if (booking.stripeSessionId === sessionId) {
      booking.status = "paid";
      delete booking.expiresAt;
      bookingsStore.set(id, booking);
      return booking;
    }
  }
  return null;
}

export function markBookingPaidById(bookingId: string) {
  const booking = bookingsStore.get(bookingId);
  if (!booking) return null;
  booking.status = "paid";
  delete booking.expiresAt;
  bookingsStore.set(bookingId, booking);
  return booking;
}
