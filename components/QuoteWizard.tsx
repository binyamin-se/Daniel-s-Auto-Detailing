"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { detailingAddOns, detailingPackages } from "@/lib/packages";
import { membershipTiers } from "@/lib/memberships";
import { saveQuoteSubmission } from "@/lib/storage";
import { ServiceCategory, VehicleSize } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const steps = ["Vehicle", "Service", "Plan", "Location", "Schedule + Contact", "Confirmed"];
const vehicleSizes: VehicleSize[] = ["Sedan", "SUV", "XL"];
const services: ServiceCategory[] = ["Detailing", "Ceramic", "Tint", "Membership"];

export function QuoteWizard() {
  const params = useSearchParams();
  const typeParam = params.get("type");
  const defaultService =
    typeParam === "membership" ? "Membership" : ((params.get("service") as ServiceCategory) || "Detailing");
  const defaultVehicle = (params.get("vehicleSize") as VehicleSize) || "Sedan";
  const prefilledPackage = params.get("package");
  const prefilledTier = params.get("membershipTier") || "premium";

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [vehicleSize, setVehicleSize] = useState<VehicleSize>(defaultVehicle);
  const [service, setService] = useState<ServiceCategory>(defaultService);
  const [packageName, setPackageName] = useState(prefilledPackage || detailingPackages[1].name);
  const [membershipTier, setMembershipTier] = useState(prefilledTier);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [serviceAddress, setServiceAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [waterPower, setWaterPower] = useState<"" | "Yes" | "No" | "Not sure">("");
  const [accessNotes, setAccessNotes] = useState("");
  const [preferredDateTime, setPreferredDateTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const selectedPackage = detailingPackages.find((pkg) => pkg.name === packageName) ?? detailingPackages[1];
  const selectedMembership = membershipTiers.find((tier) => tier.id === membershipTier) ?? membershipTiers[2];

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = detailingAddOns.find((item) => item.id === id);
    return sum + (addon?.price ?? 0);
  }, 0);
  const detailingEstimate = selectedPackage.prices[vehicleSize] + addonsTotal;
  const membershipPrice = selectedMembership.pricingBySize[vehicleSize];

  const pricingMessage = useMemo(() => {
    if (service === "Detailing") return `Starting at ${formatPrice(detailingEstimate)}`;
    if (service === "Membership") return `${formatPrice(membershipPrice)}/mo (weekly membership)`;
    if (service === "Ceramic") return "Quote required: typical range $699-$1,899";
    return "Quote required: typical range $249-$699";
  }, [service, detailingEstimate, membershipPrice]);

  const canContinue = () => {
    if (step === 0) return Boolean(vehicleSize);
    if (step === 1) return Boolean(service);
    if (step === 2) {
      if (service === "Detailing") return Boolean(packageName);
      if (service === "Membership") return Boolean(membershipTier);
      return true;
    }
    if (step === 3) return Boolean(serviceAddress && zipCode && waterPower);
    if (step === 4) return Boolean(preferredDateTime && name && phone && email);
    return false;
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const handleSubmit = () => {
    saveQuoteSubmission({
      submittedAt: new Date().toISOString(),
      vehicleSize,
      service,
      packageName:
        service === "Detailing"
          ? packageName
          : service === "Membership"
            ? selectedMembership.name
            : `${service} - custom`,
      membershipTier: service === "Membership" ? selectedMembership.id : undefined,
      addOns: selectedAddons,
      serviceAddress,
      zipCode,
      preferredDateTime,
      waterPower: waterPower || "Not sure",
      accessNotes,
      name,
      phone,
      email,
      notes
    });
    setSubmitted(true);
    setStep(5);
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold text-white md:text-4xl">Premium Mobile Quote Wizard</h1>
      <p className="mt-2 text-gray-300">{pricingMessage}</p>

      <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {steps.map((label, idx) => (
          <div
            key={label}
            className={`rounded-full px-3 py-2 text-center text-[11px] ${
              idx <= step ? "bg-accentBlue text-white" : "bg-white/5 text-gray-400"
            }`}
          >
            {idx + 1}. {label}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        {step === 0 ? (
          <div>
            <h2 className="text-xl font-medium text-white">Vehicle Size</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {vehicleSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setVehicleSize(size)}
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    size === vehicleSize ? "border-accentBlue bg-accentBlue/20 text-white" : "border-white/20 text-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div>
            <h2 className="text-xl font-medium text-white">Service Type</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {services.map((item) => (
                <button
                  key={item}
                  onClick={() => setService(item)}
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    item === service ? "border-accentBlue bg-accentBlue/20 text-white" : "border-white/20 text-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div>
            <h2 className="text-xl font-medium text-white">Package / Plan Selection</h2>
            {service === "Detailing" ? (
              <div className="mt-4 space-y-3">
                {detailingPackages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setPackageName(pkg.name)}
                    className={`w-full rounded-xl border px-4 py-3 text-left ${
                      pkg.name === packageName
                        ? "border-accentBlue bg-accentBlue/20"
                        : "border-white/20 bg-white/[0.02]"
                    }`}
                  >
                    <p className="font-medium text-white">{pkg.name}</p>
                    <p className="text-sm text-gray-300">Starting at {formatPrice(pkg.prices[vehicleSize])}</p>
                  </button>
                ))}
                <div className="pt-4">
                  <p className="text-sm font-medium text-white">Add-ons</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {detailingAddOns.map((addon) => (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`rounded-full border px-3 py-1.5 text-xs ${
                          selectedAddons.includes(addon.id)
                            ? "border-accentBlue bg-accentBlue/20 text-white"
                            : "border-white/20 text-gray-300"
                        }`}
                      >
                        {addon.name} (+{formatPrice(addon.price)})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {service === "Membership" ? (
              <div className="mt-4 space-y-3">
                {membershipTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setMembershipTier(tier.id)}
                    className={`w-full rounded-xl border px-4 py-3 text-left ${
                      tier.id === membershipTier
                        ? "border-accentBlue bg-accentBlue/20"
                        : "border-white/20 bg-white/[0.02]"
                    }`}
                  >
                    <p className="font-medium text-white">{tier.label} - {tier.name}</p>
                    <p className="text-sm text-gray-300">{formatPrice(tier.pricingBySize[vehicleSize])}/mo</p>
                  </button>
                ))}
              </div>
            ) : null}

            {service === "Ceramic" ? (
              <div className="mt-4 rounded-xl border border-white/20 bg-white/[0.02] p-4 text-sm text-gray-300">
                Ceramic pricing is quote-required after paint inspection. Typical range: $699-$1,899.
              </div>
            ) : null}

            {service === "Tint" ? (
              <div className="mt-4 rounded-xl border border-white/20 bg-white/[0.02] p-4 text-sm text-gray-300">
                Tint pricing is quote-required based on vehicle and film choice. Typical range: $249-$699.
              </div>
            ) : null}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-white">Service Location</h2>
            <input
              value={serviceAddress}
              onChange={(e) => setServiceAddress(e.target.value)}
              placeholder="Service address (required)"
              className="w-full rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
            />
            <input
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Zip code (required)"
              className="w-full rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
            />
            <div>
              <p className="mb-2 text-sm text-gray-200">Water/Power available?</p>
              <div className="flex flex-wrap gap-2">
                {(["Yes", "No", "Not sure"] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setWaterPower(option)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      waterPower === option
                        ? "border-accentBlue bg-accentBlue/20 text-white"
                        : "border-white/20 text-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={accessNotes}
              onChange={(e) => setAccessNotes(e.target.value)}
              rows={3}
              placeholder="Parking/access notes"
              className="w-full rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
            />
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-white">Preferred Time + Contact</h2>
            <input
              type="datetime-local"
              value={preferredDateTime}
              onChange={(e) => setPreferredDateTime(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
              />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
            />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Vehicle notes (optional)"
              className="w-full rounded-xl border border-white/20 bg-charcoal/70 px-4 py-3 text-sm text-white outline-none focus:border-accentBlue"
            />
          </div>
        ) : null}

        {step === 5 ? (
          <div className="rounded-2xl border border-accentBlue/40 bg-accentBlue/10 p-6 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-accentBlue">Success</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Request Confirmed</h2>
            <p className="mt-3 text-gray-200">
              Thanks. We&apos;ll confirm your location and text/call you to finalize timing.
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setStep((value) => Math.max(0, value - 1))}
          disabled={step === 0 || submitted}
          className="rounded-full border border-white/20 px-5 py-2 text-sm text-gray-200 disabled:opacity-50"
        >
          Back
        </button>
        {step < 4 ? (
          <button
            onClick={() => setStep((value) => Math.min(5, value + 1))}
            disabled={!canContinue()}
            className="rounded-full bg-accentBlue px-6 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Continue
          </button>
        ) : null}
        {step === 4 ? (
          <button
            onClick={handleSubmit}
            disabled={!canContinue()}
            className="rounded-full bg-accentRed px-6 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Submit Request
          </button>
        ) : null}
      </div>
    </section>
  );
}
