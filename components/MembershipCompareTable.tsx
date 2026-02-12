import { membershipCompareRows, membershipTiers } from "@/lib/memberships";
import { VehicleSize } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type MembershipCompareTableProps = {
  size: VehicleSize;
};

export function MembershipCompareTable({ size }: MembershipCompareTableProps) {
  return (
    <section className="mt-14 overflow-x-auto rounded-2xl border border-white/10">
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-white/[0.03]">
          <tr>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.18em] text-gray-300">Feature</th>
            {membershipTiers.map((tier) => (
              <th key={tier.id} className="px-4 py-3 text-left text-xs uppercase tracking-[0.18em] text-gray-300">
                {tier.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          <tr>
            <td className="px-4 py-3 text-sm text-white">Monthly price ({size})</td>
            {membershipTiers.map((tier) => (
              <td key={`${tier.id}-price`} className="px-4 py-3 text-sm text-gray-200">
                {formatPrice(tier.pricingBySize[size])}/mo
              </td>
            ))}
          </tr>
          {membershipCompareRows.map((row) => (
            <tr key={row.feature}>
              <td className="px-4 py-3 text-sm text-gray-200">{row.feature}</td>
              {row.values.map((value, idx) => (
                <td key={`${row.feature}-${membershipTiers[idx].id}`} className="px-4 py-3 text-sm text-gray-200">
                  {value ? "✓" : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
