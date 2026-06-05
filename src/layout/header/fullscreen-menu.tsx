"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface MenuItem {
  _key: string;
  label: string;
  href: string;
}

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems?: MenuItem[];
}

const DEFAULT_ITEMS: MenuItem[] = [
  { _key: "home", label: "Home", href: "/" },
  { _key: "about", label: "About", href: "/#about" },
  { _key: "services", label: "Services", href: "/services" },
  { _key: "work", label: "Work", href: "/portfolio" },
  { _key: "blog", label: "Journal", href: "/blog" },
  { _key: "contact", label: "Contact", href: "/contact" },
];

export default function FullscreenMenu({
  isOpen,
  onClose,
  menuItems,
}: FullscreenMenuProps) {
  const [lang, setLang] = useState<"EN" | "TR">("EN");
  const items = menuItems && menuItems.length > 0 ? menuItems : DEFAULT_ITEMS;

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fs-menu ${isOpen ? "fs-menu--open" : ""}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
    >
      <div className="fs-menu__bg" onClick={onClose} aria-hidden="true" />

      <div className="fs-menu__panel">
        <div className="fs-menu__topbar">
          <span className="fs-menu__brand">re:fabrika</span>
          <div className="fs-menu__topbar-right">
            <a
              href="https://client.refabrika.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="fs-menu__client-login"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="4.5"
                  y="10.5"
                  width="15"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M8 10.5V7.5a4 4 0 0 1 8 0v3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <span>Client Login</span>
            </a>
            <div className="fs-menu__lang" role="group" aria-label="Language">
              <button
                type="button"
                className={`fs-menu__lang-btn ${lang === "EN" ? "is-active" : ""}`}
                onClick={() => setLang("EN")}
              >
                EN
              </button>
              <span className="fs-menu__lang-sep">/</span>
              <button
                type="button"
                className={`fs-menu__lang-btn ${lang === "TR" ? "is-active" : ""}`}
                onClick={() => setLang("TR")}
              >
                TR
              </button>
            </div>
            <button
              type="button"
              className="fs-menu__close"
              onClick={onClose}
              aria-label="Close menu"
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className="fs-menu__body">
          <nav className="fs-menu__nav" aria-label="Primary">
            <ul>
              {items.map((item, idx) => (
                <li
                  key={item._key}
                  className="fs-menu__nav-item"
                  style={{ ["--i" as never]: idx }}
                >
                  <Link href={item.href} onClick={onClose}>
                    <span className="fs-menu__nav-index">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="fs-menu__nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <aside className="fs-menu__aside">
            <div className="fs-menu__company">
              <h4>Refabrika Technologies LLC</h4>
            </div>

            <div className="fs-menu__offices">
              <div className="fs-menu__office">
                <span className="fs-menu__office-tag">Headquarters</span>
                <p>
                  7901 4th St N # 26088
                  <br />
                  St. Petersburg, Florida 33702
                  <br />
                  United States
                </p>
                <a href="tel:+17273017980">+1 727 301 79 80</a>
              </div>

              <div className="fs-menu__office">
                <span className="fs-menu__office-tag">Liaison Office</span>
                <p>
                  Akarca, Mustafa Kemal Blv. No:158/A
                  <br />
                  48300 Fethiye, Muğla
                  <br />
                  Türkiye
                </p>
                <a href="tel:+905323745568">+90 532 374 55 68</a>
              </div>
            </div>

            <div className="fs-menu__platforms">
              <span className="fs-menu__platforms-tag">Verified on</span>
              <ul>
                <li>
                  <a
                    href="https://www.upwork.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Upwork
                  </a>
                </li>
                <li>
                  <a
                    href="https://clutch.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Clutch
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/partners/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Partner
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="fs-menu__footer">
          <span>© {new Date().getFullYear()} Refabrika Technologies LLC</span>
          <span>17 Years · Since 2009</span>
        </div>
      </div>
    </div>
  );
}
