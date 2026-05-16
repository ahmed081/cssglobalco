import { SiteEffects } from "@/components/client/SiteEffects";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SiteEffects />
    </>
  );
}
