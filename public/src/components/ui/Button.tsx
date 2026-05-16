import Link from "next/link";
import type { ButtonData } from "@/types/content.types";

export function Button({ data }: { data: ButtonData }) {
  const className = data.variant === "ghost" ? "btn-ghost" : data.variant === "gold" ? "btn-gold" : "btn-primary";
  return data.href.startsWith("http") ? (
    <a className={className} href={data.href}>
      {data.label}
    </a>
  ) : (
    <Link className={className} href={data.href}>
      {data.label}
    </Link>
  );
}
