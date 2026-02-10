"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/imgs/logo/rewhite.svg";
import SideToggle from "@/components/common/side-toggle";
import type { SanityImage, NavigationData, SiteSettingsData } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";

interface HeaderSevenProps {
  headerText?: string;
  logoImage?: SanityImage;
  navigation?: NavigationData;
  siteSettings?: SiteSettingsData;
}

export default function HeaderSeven({
  headerText,
  logoImage,
  navigation,
  siteSettings,
}: HeaderSevenProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Format header text with line breaks
  const formatHeaderText = (text?: string | null) => {
    const defaultText = "re:fabrika — digital marketing & brand growth agency [since 2009]";
    const safeText = text || defaultText;
    const lines = safeText.split(/\n|—/).map((line) => line.trim()).filter(Boolean);
    if (lines.length === 1) return safeText;

    return lines.map((line, idx) => (
      <span key={idx}>
        {idx > 0 && " — "}
        {line}
        {idx < lines.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <>
      <header className="header-area-6">
        <div className="header-main">
          <div className="container large">
            <div className="header-area-6__inner">
              <div className="header__logo">
                <Link href="/">
                  {logoImage ? (
                    <Image
                      src={urlFor(logoImage).url()}
                      className="normal-logo"
                      alt="Site Logo"
                      width={150}
                      height={40}
                      style={{ height: "auto" }}
                    />
                  ) : (
                    <Image
                      src={logo}
                      className="normal-logo"
                      alt="Site Logo"
                      style={{ height: "auto" }}
                    />
                  )}
                </Link>
              </div>
              {headerText && (
                <div className="header__middel">
                  <p>{formatHeaderText(headerText)}</p>
                </div>
              )}
              <div className="header__navicon">
                <button onClick={() => setIsMobileMenuOpen(true)} className="side-toggle">
                  (Browse — Menu)
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* side toggle bar */}
      <SideToggle
        isOpen={isMobileMenuOpen}
        onSideToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        logoImage={logoImage}
        navigation={navigation}
        siteSettings={siteSettings}
      />
      {/* side toggle bar */}
    </>
  );
}
