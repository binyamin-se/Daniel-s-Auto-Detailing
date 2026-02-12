"use client";

import { useEffect, useState } from "react";
import { membershipTiers } from "@/lib/memberships";
import { saveMembershipLead } from "@/lib/storage";
import { VehicleSize } from "@/lib/types";

type MembershipSignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tierId: string;
  vehicleSize: VehicleSize;
};

export function MembershipSignupModal({ isOpen, onClose, tierId, vehicleSize }: MembershipSignupModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [preferredDayTime, setPreferredDayTime] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setName("");
      setPhone("");
      setEmail("");
      setVehicleInfo("");
      setServiceAddress("");
      setZipCode("");
      setPreferredDayTime("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const tier = membershipTiers.find((entry) => entry.id === tierId) ?? membershipTiers[2];
  const isValid = Boolean(name && phone && email && vehicleInfo && serviceAddress && zipCode && preferredDayTime);

  const submit = () => {
    if (!isValid) return;
    saveMembershipLead({
      submittedAt: new Date().toISOString(),
      tierId: tier.id,
      tierName: tier.label,
      vehicleSize,
      name,
      phone,
      email,
      vehicleInfo,
      serviceAddress,
      zipCode,
      preferredDayTime
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[80] bg-black/80 p-4">
      <div className="mx-auto mt-6 max-w-xl rounded-3xl border border-white/10 bg-charcoal p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs tracking-[0.18em] text-accentBlue">Join Membership</p>
            <h3 className="mt-1 text-2xl font-semibold text-white">
              {tier.label} - {vehicleSize}
            </h3>
          </div>
          <button onClick={onClose} className="rounded-full border border-white/20 px-3 py-1 text-sm text-gray-200">
            Close
          </button>
        </div>
        {submitted ? (
          <div className="mt-6 rounded-2xl border border-accentBlue/50 bg-accentBlue/10 p-5">
            <p className="text-white">We&apos;ll confirm your location and text you to finalize your membership.</p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              className="w-full rounded-xl border border-white/20 bg-charcoal/80 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Phone"
                className="rounded-xl border border-white/20 bg-charcoal/80 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
              />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Email"
                className="rounded-xl border border-white/20 bg-charcoal/80 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
              />
            </div>
            <input
              value={vehicleInfo}
              onChange={(event) => setVehicleInfo(event.target.value)}
              placeholder="Vehicle info (year, make, model)"
              className="w-full rounded-xl border border-white/20 bg-charcoal/80 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
            />
            <input
              value={serviceAddress}
              onChange={(event) => setServiceAddress(event.target.value)}
              placeholder="Service address"
              className="w-full rounded-xl border border-white/20 bg-charcoal/80 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={zipCode}
                onChange={(event) => setZipCode(event.target.value)}
                placeholder="Zip code"
                className="rounded-xl border border-white/20 bg-charcoal/80 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
              />
              <input
                value={preferredDayTime}
                onChange={(event) => setPreferredDayTime(event.target.value)}
                placeholder="Preferred day/time"
                className="rounded-xl border border-white/20 bg-charcoal/80 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
              />
            </div>
            <button
              onClick={submit}
              disabled={!isValid}
              className="w-full rounded-full bg-accentBlue px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              Submit Membership Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
