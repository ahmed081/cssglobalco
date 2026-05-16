import Image from "next/image";
import Link from "next/link";
import { footerItems } from "@/data/navigation.data";
import { siteData } from "@/data/site.data";

export function Footer() {
  return (
    <footer>
      <Link className="footer-logo" href="/" aria-label={siteData.name}>
        <Image alt="CSS" src={siteData.logo} width={120} height={60} loading="lazy" />
      </Link>
      <ul className="footer-links">
        {footerItems.map((item) => (
          <li key={item.href}>
            {item.href.includes("#") ? <a href={item.href}>{item.label}</a> : <Link href={item.href}>{item.label}</Link>}
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
