import type { Metadata } from "next";
import { MembershipsPageClient } from "@/components/MembershipsPageClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Memberships",
  description: "Weekly wash memberships with mobile service and flexible recurring plans.",
  path: "/membership"
});

export default function MembershipsPage() {
  return <MembershipsPageClient />;
}
