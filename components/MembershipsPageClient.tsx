"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MembershipHero } from "@/components/MembershipHero";
import { MembershipCompareTable } from "@/components/MembershipCompareTable";
import { MembershipFAQ } from "@/components/MembershipFAQ";
import { PricingCards } from "@/components/PricingCards";
import { VehicleSizeToggle } from "@/components/VehicleSizeToggle";
import { CTASection } from "@/components/CTASection";
import { MembershipLeadForm } from "@/components/MembershipLeadForm";
import { membershipTiers } from "@/lib/memberships";
import { VehicleSize } from "@/lib/types";

export function MembershipsPageClient() {
  const router = useRouter();
  const [vehicleSize, setVehicleSize] = useState<VehicleSize>("Sedan");

  const featuredPrice = useMemo(() => {
    const featured = membershipTiers.find((tier) => tier.featured) ?? membershipTiers[2];
    return featured.pricingBySize[vehicleSize];
  }, [vehicleSize]);

  const openJoin = (tierId = "premium") => {
    router.push(`/quote?type=membership&service=Membership&membershipTier=${tierId}&vehicleSize=${vehicleSize}`);
  };

  return (
    <>
      <MembershipHero />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accentBlue">Choose Vehicle Size</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Weekly Membership (4 washes per month)</h2>
            <p className="mt-2 text-sm text-gray-300">
              Starting at ${featuredPrice}/mo for featured plan. Prices vary by vehicle size and condition.
            </p>
            <p className="mt-1 text-xs text-accentRed">Limited spots available for peak weekly routes.</p>
          </div>
          <VehicleSizeToggle value={vehicleSize} onChange={setVehicleSize} />
        </div>

        <PricingCards size={vehicleSize} onJoin={openJoin} />

        <p className="mt-4 text-xs text-gray-400">
          Cancel anytime. Unused washes may roll over for a limited period (policy placeholder).
        </p>
        <p className="mt-1 text-xs text-gray-400">Prices vary by vehicle size and condition.</p>

        <MembershipCompareTable size={vehicleSize} />
        <MembershipFAQ />
        <MembershipLeadForm />
        <CTASection
          title="Ready To Lock In Weekly Clean?"
          description="Join your mobile wash plan now. We come to your home or workplace every week."
        />
      </div>

    </>
  );
}
