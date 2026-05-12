import { Link } from "react-router-dom";
import { footerItems } from "../../data/navigation.data";
import { siteData } from "../../data/site.data";

export function Footer() {
  return (
    <footer>
      <Link className="footer-logo" to="/" aria-label={siteData.name}>
        <img alt="CSS" src={siteData.logo} loading="lazy" />
      </Link>
      <ul className="footer-links">
        {footerItems.map((item) => (
          <li key={item.href}>
            {item.href.startsWith("/#") ? <a href={item.href}>{item.label}</a> : <Link to={item.href}>{item.label}</Link>}
          </li>
        ))}
      </ul>
      <div className="footer-copy">
        {siteData.copyright}
        <br />
        {siteData.location} · {siteData.email}
      </div>
    </footer>
  );
}
