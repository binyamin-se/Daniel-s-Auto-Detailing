import { Metadata } from "next";

export const primaryCity = "MD / VA / DC";
export const businessName = "Daniel's Auto Detailing";
export const siteUrl = "https://danisautodetailing.vercel.app";
export const businessPhone = "(202) 848-0979";
export const businessPhoneHref = "tel:+12028480979";
export const businessTextHref = "sms:+12028480979";
export const businessEmail = "daniels.autodetailing21@gmail.com";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export function createPageMetadata({ title, description, path = "/" }: MetadataInput): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${businessName}`,
      description,
      url,
      type: "website"
    }
  };
}

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDetailing",
    name: businessName,
    telephone: "+1-202-848-0979",
    email: businessEmail,
    url: siteUrl,
    areaServed: ["Maryland", "Virginia", "District of Columbia"],
    priceRange: "$$",
    description:
      "Mobile auto detailing and tint service-area business. We come to your home or workplace for detailing, paint correction, ceramic coating, and window tint.",
    openingHours: "Mo-Sa 08:00-19:00",
    serviceType: ["Mobile Auto Detailing", "Window Tint", "Paint Correction", "Ceramic Coating", "Memberships"]
  };
}
