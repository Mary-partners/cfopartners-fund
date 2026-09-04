import { ListChecks, FolderClosed } from "lucide-react";

export type PortalNavItem = {
  href: string;
  label: string;
  icon: typeof ListChecks;
};

export const PORTAL_NAV_ITEMS: PortalNavItem[] = [
  { href: "/portal/work", label: "Work", icon: ListChecks },
  { href: "/portal/documents", label: "Documents", icon: FolderClosed },
];
