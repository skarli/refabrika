"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/imgs/logo/rewhite.svg";
import SideToggle from "@/components/common/side-toggle";

export default function HeaderSeven() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      <header className="header-area-6">
        <div className="header-main">
          <div className="container large">
            <div className="header-area-6__inner">
              <div className="header__logo">
                <Link href="/">
                  <Image
                    src={logo}
                    className="normal-logo"
                    alt="Site Logo"
                    style={{ height: "auto" }}
                  />
                </Link>
              </div>
              <div className="header__middel">
                <p>
                  re:fabrika — digital marketing <br />
                  & brand growth agency <br />
                  [since 2009]
                </p>
              </div>
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
      />
      {/* side toggle bar */}
    </>
  );
}
