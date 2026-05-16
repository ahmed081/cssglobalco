"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigationItems } from "@/data/navigation.data";
import { siteData } from "@/data/site.data";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileOpen);
    return () => document.body.classList.remove("menu-open");
  }, [mobileOpen]);

  return (
    <>
      <nav id="nav" className={scrolled ? "scrolled" : ""}>
        <Link className="nav-logo" href="/" aria-label={siteData.name}>
          <Image alt={siteData.name} src={siteData.logo} width={220} height={110} priority />
        </Link>

        <ul className="nav-links">
          {navigationItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname === item.href;
            return (
              <li key={item.href}>
                {item.href.includes("#") ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <Link className={active ? "active" : ""} href={item.href}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="nav-actions">
          <a className="nav-cta" href="/#contact">
            Book a call
          </a>
          <button
            className="mob-btn"
            aria-label="Open mobile menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
