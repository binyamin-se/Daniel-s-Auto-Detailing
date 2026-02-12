import { membershipTiers } from "@/lib/memberships";
import { VehicleSize } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type PricingCardsProps = {
  size: VehicleSize;
  onJoin: (tierId: string) => void;
};

export function PricingCards({ size, onJoin }: PricingCardsProps) {
  const joinLabel = (label: string) => `${label.slice(0, 1)}${label.slice(1).toLowerCase()}`;

  return (
    <section id="membership-plans" className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {membershipTiers.map((tier) => (
        <article
          key={tier.id}
          className={`relative rounded-2xl border p-6 ${
            tier.featured
              ? "border-accentBlue bg-gradient-to-b from-accentBlue/20 to-white/[0.02] shadow-glass"
              : "border-white/10 bg-white/[0.03]"
          }`}
        >
          {tier.featured ? (
            <span className="absolute -top-3 left-5 rounded-full bg-accentRed px-3 py-1 text-xs font-semibold text-white">
              Most Popular
            </span>
          ) : null}
          <p className="text-xs tracking-[0.18em] text-accentBlue">{tier.label}</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{tier.name}</h3>
          <p className="mt-2 text-sm text-gray-300">{tier.summary}</p>
          <p className="mt-4 text-3xl font-semibold text-white">{formatPrice(tier.pricingBySize[size])}/mo</p>
          <p className="text-xs text-gray-400">Cancel anytime</p>
          <ul className="mt-4 space-y-2">
            {tier.benefits.slice(0, 6).map((benefit) => (
              <li key={benefit} className="text-sm text-gray-200">
                - {benefit}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-gray-300">
            Best for: <span className="text-white">{tier.bestFor}</span>
          </p>
          <button
            onClick={() => onJoin(tier.id)}
            className="mt-5 w-full rounded-full bg-accentBlue px-4 py-2 text-sm font-semibold text-white"
          >
            Join {joinLabel(tier.label)}
          </button>
        </article>
      ))}
    </section>
  );
}
