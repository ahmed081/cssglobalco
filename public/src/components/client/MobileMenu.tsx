"use client";

import Link from "next/link";
import { navigationItems } from "@/data/navigation.data";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  return (
    <div id="mob-overlay" className={open ? "is-open" : ""} aria-hidden={!open}>
      <button id="mob-close" onClick={onClose} type="button" aria-label="Close mobile menu">
        ✕
      </button>
      {navigationItems.map((item) =>
        item.href.includes("#") ? (
          <a key={item.href} href={item.href} onClick={onClose}>
            {item.label}
          </a>
        ) : (
          <Link key={item.href} href={item.href} onClick={onClose}>
            {item.label}
          </Link>
        )
      )}
      <a href="/#contact" id="mob-cta-mob" onClick={onClose}>
        Book a call
      </a>
    </div>
  );
}
