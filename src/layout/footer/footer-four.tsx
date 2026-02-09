import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/imgs/logo/rewhite.svg';

const navItems: { label: string; href: string }[] = [
  { label: "Services", href: "/services-5" },
  { label: "Portfolio", href: "/portfolio-5" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function FooterFour() {
  return (
     <footer className="footer-area-4 section-spacing-top">
      <div className="container large">
        <div className="footer-widget-wrapper-box">
          <div className="footer-widget-wrapper">
            <div className="footer-widget-box">
              <div className="footer-logo">
                <Link href="/">
                  <Image
                    src={logo}
                    alt="site-logo"
                    style={{height:'auto'}}
                  />
                </Link>
              </div>
            </div>

            <div className="footer-widget-box">
              <ul className="footer-nav-list">
                {navItems.map((item, idx) => (
                  <li key={idx}>
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
                © {new Date().getFullYear()} re:fabrika — Crafted with intent, built to stand out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
