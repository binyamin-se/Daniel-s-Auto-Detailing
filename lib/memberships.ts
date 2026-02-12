import { MembershipTier } from "@/lib/types";

// Placeholder membership pricing. Edit this object to update all membership pricing UI.
export const membershipTiers: MembershipTier[] = [
  {
    id: "starter",
    label: "STARTER",
    name: "Weekly Exterior Refresh",
    summary: "1 wash per week (4 washes per month).",
    benefits: [
      "Exterior hand wash",
      "Wheels rinse + tire shine",
      "Windows exterior",
      "Quick towel dry + spray detail"
    ],
    bestFor: "Commuters / daily drivers",
    pricingBySize: { Sedan: 149, SUV: 179, XL: 209 }
  },
  {
    id: "standard",
    label: "STANDARD",
    name: "Weekly Exterior + Monthly Interior Reset",
    summary: "1 wash per week (4 washes per month).",
    benefits: [
      "Everything in Starter",
      "Monthly interior reset",
      "Interior vacuum (front + seats)",
      "Wipe-down high-touch surfaces"
    ],
    bestFor: "Families / rideshare drivers",
    pricingBySize: { Sedan: 199, SUV: 229, XL: 269 }
  },
  {
    id: "premium",
    label: "PREMIUM",
    name: "Weekly + Biweekly Interior + Spray Sealant",
    summary: "1 wash per week (4 washes per month).",
    benefits: [
      "Everything in Standard",
      "Biweekly interior touch-up",
      "Spray sealant (monthly)"
    ],
    bestFor: "People who want their car always showroom-ready",
    pricingBySize: { Sedan: 269, SUV: 309, XL: 359 },
    featured: true
  },
  {
    id: "elite",
    label: "ELITE",
    name: "Concierge Finish",
    summary: "1 wash per week (4 washes per month).",
    benefits: [
      "Everything in Premium",
      "Full interior reset monthly",
      "Priority scheduling",
      "Ceramic maintenance topper monthly",
      "Discount on tint/coating services"
    ],
    bestFor: "Luxury cars / enthusiasts",
    pricingBySize: { Sedan: 369, SUV: 419, XL: 479 }
  }
];

export const membershipCompareRows = [
  { feature: "Weekly wash visits", values: [true, true, true, true] },
  { feature: "Exterior hand wash", values: [true, true, true, true] },
  { feature: "Wheels + tire shine", values: [true, true, true, true] },
  { feature: "Interior vacuum", values: [false, true, true, true] },
  { feature: "High-touch wipe-down", values: [false, true, true, true] },
  { feature: "Bug/tar spot treatment", values: [false, false, true, true] },
  { feature: "Monthly spray sealant", values: [false, false, true, true] },
  { feature: "Monthly deep clean rotation", values: [false, false, false, true] },
  { feature: "Priority scheduling", values: [false, false, false, true] }
];
