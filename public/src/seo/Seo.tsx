import { useEffect } from "react";
import type { SeoData } from "../types/content.types";

function setMeta(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function setOg(property: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function Seo({ seo }: { seo: SeoData }) {
  useEffect(() => {
    document.title = seo.title;
    setMeta("description", seo.description);
    if (seo.keywords) setMeta("keywords", seo.keywords);
    setOg("og:title", seo.title);
    setOg("og:description", seo.description);
    setOg("og:type", "website");
  }, [seo]);

  return null;
}
