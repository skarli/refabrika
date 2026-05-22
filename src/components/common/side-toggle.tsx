import React from "react";
import Link from "next/link";
import logo from "@/assets/imgs/logo/rewhite.svg";
import Image from "next/image";
import type { SanityImage, NavigationData, SiteSettingsData } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";

interface MenuItem {
  _key: string;
  label: string;
  href: string;
}

type IProps = {
  isOpen: boolean;
  onSideToggle: () => void;
  logoImage?: SanityImage;
  navigation?: NavigationData;
  siteSettings?: SiteSettingsData;
};

export default function SideToggle({
  isOpen,
  onSideToggle,
  logoImage,
  navigation,
  siteSettings,
}: IProps) {
  const menuItems: MenuItem[] = navigation?.mainMenu || [
    { _key: "1", label: "Services", href: "/services" },
    { _key: "2", label: "Portfolio", href: "/portfolio" },
    { _key: "3", label: "Blog", href: "/blog" },
    { _key: "4", label: "FAQ", href: "/faq" },
    { _key: "5", label: "Contact", href: "/contact" },
  ];

  const contactTitle = navigation?.sideMenuContactTitle || "Contact US";
  const buttonText = navigation?.sideMenuButtonText || "Let's Talk";

  const contactInfo = siteSettings?.contactInfo || {
    address: "Mustafa Kemal Blv., 158A Muğla/Fethiye",
    email: "sadettin@refabrika.com",
    phone: "+90 532 374 55 68",
  };

  return (
    <React.Fragment>
      <aside className="fix">
        <div className={`side-info ${isOpen ? "info-open" : ""}`}>
          <div className="side-info-content">
            <div className="offset-widget offset-header">
              <div className="offset-logo">
                <Link href="/">
                  {logoImage ? (
                    <Image
                      src={urlFor(logoImage).url()}
                      alt="site logo"
                      width={150}
                      height={40}
                      style={{ height: "auto" }}
                    />
                  ) : (
                    <Image src={logo} alt="site logo" style={{ height: "auto" }} />
                  )}
                </Link>
              </div>
              <button
                onClick={onSideToggle}
                id="side-info-close"
                className="side-info-close"
                aria-label="Close menu"
                type="button"
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
            {/* mobile menu */}
            <div className="mobile-menu d-xl-none fix mean-container">
              <div className="mean-bar">
                <nav className="mean-nav">
                  <ul>
                    {menuItems.map((menu) => (
                      <li key={menu._key}>
                        <Link href={menu.href}>{menu.label}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            {/* mobile menu */}
            <div className="offset-button">
              <Link href="/contact" className="rr-btn hover-bg-theme">
                <span className="btn-wrap">
                  <span className="text-one">{buttonText}</span>
                  <span className="text-two">{buttonText}</span>
                </span>
              </Link>
            </div>
            <div className="offset-widget-box">
              <h2 className="title">{contactTitle}</h2>
              <div className="contact-meta">
                {contactInfo.address && (
                  <div className="contact-item">
                    <span className="icon">
                      <i className="fa-solid fa-location-dot"></i>
                    </span>
                    <span className="text">{contactInfo.address}</span>
                  </div>
                )}
                {contactInfo.email && (
                  <div className="contact-item">
                    <span className="icon">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <span className="text">
                      <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                    </span>
                  </div>
                )}
                {contactInfo.phone && (
                  <div className="contact-item">
                    <span className="icon">
                      <i className="fa-solid fa-phone"></i>
                    </span>
                    <span className="text">
                      <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>{contactInfo.phone}</a>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className={`offcanvas-overlay ${isOpen ? "overlay-open" : ""}`}></div>
    </React.Fragment>
  );
}
