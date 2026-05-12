import {useEffect, useRef} from "react";

function normalizeLinks(root: ParentNode) {
    root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
        const href = anchor.getAttribute("href");
        if (!href) return;
        anchor.setAttribute(
            "href",
            href
                .replace("index.html#", "/#")
                .replace("services.html#", "/services#")
                .replace("pricing.html#", "/pricing#")
                .replace("index.html", "/")
                .replace("services.html", "/services")
                .replace("pricing.html", "/pricing")
        );
    });
}

export function RawHtml({html}: { html: string }) {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (ref.current) normalizeLinks(ref.current);
    }, [html]);

    return <main ref={ref} className="route-page" dangerouslySetInnerHTML={{__html: html}}/>;
}
