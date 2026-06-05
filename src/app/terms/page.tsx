import { Metadata } from "next";
import LegalPageView, { buildLegalMetadata } from "@/components/legal/legal-page";

export async function generateMetadata(): Promise<Metadata> {
  return buildLegalMetadata("terms");
}

export default async function TermsPage() {
  return <LegalPageView pageType="terms" />;
}
