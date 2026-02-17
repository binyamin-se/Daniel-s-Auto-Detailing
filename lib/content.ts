import { Review } from "@/lib/types";
import { businessName, primaryCity, businessEmail, businessPhone, businessPhoneHref, businessTextHref } from "@/lib/seo";

export { businessName, primaryCity };

export const phoneDisplay = businessPhone;
export const phoneHref = businessPhoneHref;
export const textHref = businessTextHref;
export const emailAddress = businessEmail;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/book", label: "Book Now" },
  { href: "/services", label: "Services" },
  { href: "/membership", label: "Memberships" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" }
];

export const trustChips = ["Fully Mobile", "Paint-Safe Process", "Professional-Grade Products"];
export const serviceAreaCities = ["Maryland", "Virginia", "Washington, DC"];

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Lauren Lewis",
    rating: 5,
    service: "Full Detail",
    text: "My car looks brand new. Daniel spent 4.5 hours and was professional and thorough. I will be a repeat customer."
  },
  {
    id: "r2",
    name: "Google Reviewer",
    rating: 5,
    service: "Interior Reset",
    text: "If you are thinking about it, stop and book him. My seats are the cleanest they have looked in years."
  },
  {
    id: "r3",
    name: "Noah R.",
    rating: 5,
    service: "Ceramic Coating",
    text: "Water beads like crazy and the finish pops in every angle."
  },
  {
    id: "r4",
    name: "Samira K.",
    rating: 5,
    service: "Window Tint",
    text: "Cabin stays cooler and the tint cut glare instantly."
  },
  {
    id: "r5",
    name: "Jordan P.",
    rating: 5,
    service: "Mobile Detailing",
    text: "They came to my office lot and had everything done before I clocked out."
  },
  {
    id: "r6",
    name: "Ash C.",
    rating: 4,
    service: "Signature Detail",
    text: "Great communication and premium products. Worth every dollar."
  },
  {
    id: "r7",
    name: "Rachel D.",
    rating: 5,
    service: "Maintenance Plan",
    text: "Monthly plan keeps my car consistently spotless with zero hassle."
  },
  {
    id: "r8",
    name: "Ivan L.",
    rating: 5,
    service: "Interior + Exterior",
    text: "Attention to detail was exceptional. Every trim piece looked restored."
  }
];

export const faqItems = [
  {
    q: "What should I do before arrival?",
    a: "Remove personal valuables and provide access to the vehicle. We handle the rest."
  },
  {
    q: "How long does a full detail take?",
    a: "Most details take 2-5 hours depending on package and vehicle condition."
  },
  {
    q: "Do you need water or power?",
    a: "No. We are fully mobile with onboard water and power for most appointments."
  },
  {
    q: "What if weather changes?",
    a: "We monitor forecasts and reschedule or relocate covered services if needed."
  },
  {
    q: "Can you work at my office?",
    a: "Yes, as long as lot rules allow mobile auto detailing activity."
  },
  {
    q: "How often should I detail my vehicle?",
    a: "Most clients book every 4-8 weeks to keep interiors and paint in prime condition."
  },
  {
    q: "Is ceramic coating permanent?",
    a: "No coating is permanent; durability depends on care. We offer 1/3/5-year options."
  },
  {
    q: "Do you guarantee results?",
    a: "We provide a final walkthrough and stand behind workmanship with clear expectations."
  }
];
