import { AddOn, DetailPackage } from "@/lib/types";

export const detailingPackages: DetailPackage[] = [
  {
    id: "basic-detail",
    name: "Basic Detail",
    description: "Entry package for routine maintenance and interior reset.",
    prices: { Sedan: 100, SUV: 120, XL: 150 },
    includes: [
      "Hand wash",
      "Wheels deep cleaned",
      "Spray wax",
      "Tire shine",
      "Air blower and towel dry",
      "Windows cleaned",
      "Door and trunk jambs deep cleaned",
      "Interior blow out",
      "Vacuum",
      "Everything interior wiped down",
      "Air freshener (optional)"
    ]
  },
  {
    id: "mini-detail",
    name: "Mini Detail",
    description: "Stronger inside-out refresh with steam focus on high-touch zones.",
    prices: { Sedan: 200, SUV: 250, XL: 300 },
    includes: [
      "Hand wash",
      "Wheels deep cleaned",
      "Spray ceramic wax",
      "Tire shine",
      "Air blower and towel dry",
      "Windows cleaned",
      "Door and trunk jambs deep cleaned",
      "Interior blow out",
      "Full deep vacuum",
      "Everything interior wiped down",
      "Full steam cleaning treatment on cup holders, A/C vents and crevices",
      "Air freshener (optional)"
    ]
  },
  {
    id: "full-interior-only",
    name: "Full Interior Only",
    description: "Dedicated interior restoration and extraction-focused package.",
    prices: { Sedan: 300, SUV: 350, XL: 400 },
    includes: [
      "Door panels, dash and console deep cleaned and scrubbed",
      "Full steam cleaning treatment on cup holders, A/C vents and crevices",
      "Shampoo and heated extraction on all fabric seats and floor carpet (if applicable)",
      "Removal of common stains (juice, soda, coffee, dirt)",
      "Deep clean and condition leather seats (if applicable)",
      "Interior conditioning and protectant (non-greasy)",
      "Air freshener",
      "Headliner clean"
    ]
  },
  {
    id: "full-detail",
    name: "Full Detail",
    description: "Exterior decontamination and protection plus full interior detail.",
    prices: { Sedan: 400, SUV: 450, XL: 500 },
    popular: true,
    includes: [
      "Hand wash",
      "Clay bar treatment",
      "Apply wax or sealant (paint protection)",
      "Fender wheel cleaning",
      "Wheels deep cleaned and tire cleaning",
      "Tire dressing",
      "Windows cleaned",
      "Includes full interior detail package"
    ]
  },
  {
    id: "premium-detail",
    name: "Premium Detail",
    description: "Top package with paint enhancement and complete interior finish.",
    prices: { Sedan: 600, SUV: 650, XL: 700 },
    includes: [
      "Hand wash and deep paint decontamination wash + clay bar",
      "One-step paint enhancement (light polish) for gloss and light scratches",
      "High quality paint sealant or wax",
      "Detailed wheels, tires and fender well clean",
      "Tire dressing",
      "Windows cleaned",
      "Includes full interior detail package"
    ]
  }
];

export const detailingAddOns: AddOn[] = [
  { id: "pet-hair", name: "Pet Hair Removal", price: 50 },
  { id: "ozone", name: "Ozone Treatment (Odor Removal)", price: 100 },
  { id: "windshield-ceramic", name: "Windshield Ceramic Coating", price: 100 },
  { id: "headlight-restore", name: "Headlight Restoration", price: 100 },
  { id: "engine-detail", name: "Engine Detail", price: 100 },
  { id: "leather-coat", name: "Leather Coat", price: 100 },
  { id: "fabric-coat", name: "Fabric Coat", price: 100 }
];

export const tintPricing = {
  carbon: {
    title: "Carbon Tint",
    rows: [
      { label: "Front 2 windows only", price: 100 },
      { label: "Sedan/Coupe/Small Truck", price: 180 },
      { label: "Large Truck/XLSUV", price: 180 }
    ],
    note: "All around, front windshield not included."
  },
  ceramic: {
    title: "Ceramic Tint",
    rows: [
      { label: "Front 2 windows only", price: 150 },
      { label: "Sedan/Coupe/Small Truck", price: 250 },
      { label: "Large Truck/XLSUV", price: 250 }
    ],
    note: "All around, front windshield not included."
  },
  windshield: {
    title: "Front Windshield Tint Only",
    rows: [
      { label: "Carbon tint front windshield", price: 100 },
      { label: "Ceramic tint front windshield", price: 150 }
    ],
    note: ""
  }
};

export const ceramicOffering = {
  title: "3-Year Ceramic Coating Protection",
  features: [
    "Professional-grade ceramic coating application",
    "Protection up to 3 years (with proper maintenance)",
    "Deep, high-gloss wet look finish",
    "Extreme hydrophobic properties (water and dirt repellency)",
    "UV, oxidation and environmental contamination protection",
    "Easier washing and long-term paint preservation"
  ]
};
