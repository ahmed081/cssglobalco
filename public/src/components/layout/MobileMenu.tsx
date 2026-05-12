import { NavLink } from "react-router-dom";
import { navigationItems } from "../../data/navigation.data";

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
        item.href.startsWith("/#") ? (
          <a key={item.href} href={item.href} onClick={onClose}>
            {item.label}
          </a>
        ) : (
          <NavLink key={item.href} to={item.href} onClick={onClose} end={item.href === "/"}>
            {item.label}
          </NavLink>
        )
      )}
      <a href="/#contact" id="mob-cta-mob" onClick={onClose}>
        Book a call
      </a>
    </div>
  );
}
