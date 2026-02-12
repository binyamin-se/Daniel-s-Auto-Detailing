export type VehicleSize = "Sedan" | "SUV" | "XL";
export type ServiceCategory = "Detailing" | "Ceramic" | "Tint" | "Membership";

export type DetailPackage = {
  id: string;
  name: string;
  description: string;
  popular?: boolean;
  prices: Record<VehicleSize, number>;
  includes: string[];
};

export type AddOn = {
  id: string;
  name: string;
  price: number;
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  service: string;
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: "Detailing" | "Interior" | "Ceramic" | "Tint" | "Before/After";
  caption: string;
  beforeSrc?: string;
  afterSrc?: string;
};

export type QuoteSubmission = {
  submittedAt: string;
  vehicleSize: VehicleSize;
  service: ServiceCategory;
  packageName: string;
  membershipTier?: string;
  addOns: string[];
  serviceAddress: string;
  zipCode: string;
  preferredDateTime: string;
  waterPower: "Yes" | "No" | "Not sure";
  accessNotes: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

export type MembershipTier = {
  id: string;
  label: string;
  name: string;
  summary: string;
  benefits: string[];
  bestFor: string;
  pricingBySize: Record<VehicleSize, number>;
  featured?: boolean;
};

export type MembershipLead = {
  submittedAt: string;
  tierId: string;
  tierName: string;
  vehicleSize: VehicleSize;
  name: string;
  phone: string;
  email: string;
  vehicleInfo: string;
  serviceAddress: string;
  zipCode: string;
  preferredDayTime: string;
};
