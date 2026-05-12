import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { navigationItems } from "../../data/navigation.data";
import { siteData } from "../../data/site.data";
import { MobileMenu } from "./MobileMenu";

export function Header() {
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
  }, [mobileOpen]);

  return (
    <>
      <nav id="nav" className={scrolled ? "scrolled" : ""}>
        <NavLink className="nav-logo" to="/" aria-label={siteData.name}>
          <img alt={siteData.name} src={siteData.logo} loading="eager" />
        </NavLink>

        <ul className="nav-links">
          {navigationItems.map((item) => (
            <li key={item.href}>
              {item.href.startsWith("/#") ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <NavLink to={item.href} end={item.href === "/"}>
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a className="nav-cta" href="/#contact">Book a call</a>
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
