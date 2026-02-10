import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/imgs/logo/rewhite.svg";
import type { SanityImage, NavigationData } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";

interface MenuItem {
  _key: string;
  label: string;
  href: string;
}

interface FooterFourProps {
  logoImage?: SanityImage;
  footerText?: string;
  navigation?: NavigationData;
}

export default function FooterFour({
  logoImage,
  footerText = "Crafted with intent, built to stand out.",
  navigation,
}: FooterFourProps) {
  const navItems: MenuItem[] = navigation?.mainMenu || [
    { _key: "1", label: "Services", href: "/services" },
    { _key: "2", label: "Portfolio", href: "/portfolio" },
    { _key: "3", label: "Blog", href: "/blog" },
    { _key: "4", label: "FAQ", href: "/faq" },
    { _key: "5", label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="footer-area-4 section-spacing-top">
      <div className="container large">
        <div className="footer-widget-wrapper-box">
          <div className="footer-widget-wrapper">
            <div className="footer-widget-box">
              <div className="footer-logo">
                <Link href="/">
                  {logoImage ? (
                    <Image
                      src={urlFor(logoImage).url()}
                      alt="site-logo"
                      width={150}
                      height={40}
                      style={{ height: "auto" }}
                    />
                  ) : (
                    <Image src={logo} alt="site-logo" style={{ height: "auto" }} />
                  )}
                </Link>
              </div>
            </div>

            <div className="footer-widget-box">
              <ul className="footer-nav-list">
                {navItems.map((item) => (
                  <li key={item._key}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-area">
        <div className="container large">
          <div className="copyright-area-inner">
            <div className="copyright-text">
              <p className="text">
                © {new Date().getFullYear()} re:fabrika — {footerText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
