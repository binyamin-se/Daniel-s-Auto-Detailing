import type { Metadata } from "next";
import { BookFlow } from "@/components/BookFlow";
import { CTASection } from "@/components/CTASection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Book Now",
  description: "Pick an available slot and pay a deposit to confirm your appointment.",
  path: "/book"
});

export default function BookPage() {
  return (
    <>
      <BookFlow />
      <CTASection title="Need Help Booking?" description="Call or text us and we can reserve your slot quickly." />
    </>
  );
}
