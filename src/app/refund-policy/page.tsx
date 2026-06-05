import { Metadata } from "next";
import LegalPageView, { buildLegalMetadata } from "@/components/legal/legal-page";

export async function generateMetadata(): Promise<Metadata> {
  return buildLegalMetadata("refund");
}

export default async function RefundPolicyPage() {
  return <LegalPageView pageType="refund" />;
}
