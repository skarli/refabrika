import { Metadata } from "next";
import LegalPageView, { buildLegalMetadata } from "@/components/legal/legal-page";

export async function generateMetadata(): Promise<Metadata> {
  return buildLegalMetadata("privacy");
}

export default async function PrivacyPage() {
  return <LegalPageView pageType="privacy" />;
}
