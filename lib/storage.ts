import { MembershipLead, QuoteSubmission } from "@/lib/types";

const KEY = "daniels-auto-detail-quotes";
const MEMBERSHIP_KEY = "daniels-auto-detail-membership-leads";

export const saveQuoteSubmission = (submission: QuoteSubmission) => {
  if (typeof window === "undefined") return;
  const current = window.localStorage.getItem(KEY);
  const parsed: QuoteSubmission[] = current ? JSON.parse(current) : [];
  parsed.unshift(submission);
  window.localStorage.setItem(KEY, JSON.stringify(parsed.slice(0, 50)));
};

export const saveMembershipLead = (lead: MembershipLead) => {
  if (typeof window === "undefined") return;
  const current = window.localStorage.getItem(MEMBERSHIP_KEY);
  const parsed: MembershipLead[] = current ? JSON.parse(current) : [];
  parsed.unshift(lead);
  window.localStorage.setItem(MEMBERSHIP_KEY, JSON.stringify(parsed.slice(0, 50)));
};
