import {
  LayoutDashboard,
  Building2,
  ListChecks,
  Inbox,
  ShieldCheck,
  CalendarClock,
  Receipt,
  FolderClosed,
  Users,
  BarChart3,
  Workflow,
  Settings,
  MessagesSquare,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  /** false = placeholder page, ships in a later phase (see /docs/implementation-plan.md) */
  implemented: boolean;
  phase: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/os/dashboard", label: "Command Centre", icon: LayoutDashboard, implemented: true, phase: "Phase 1" },
  { href: "/os/clients", label: "Clients", icon: Building2, implemented: true, phase: "Phase 1" },
  { href: "/os/work", label: "Work", icon: ListChecks, implemented: true, phase: "Phase 1" },
  { href: "/os/requests", label: "Requests", icon: Inbox, implemented: true, phase: "Phase 2" },
  { href: "/os/quality", label: "Quality", icon: ShieldCheck, implemented: true, phase: "Phase 2" },
  { href: "/os/calendar", label: "Calendar & Deadlines", icon: CalendarClock, implemented: true, phase: "Phase 1" },
  { href: "/os/meetings", label: "Meetings & Decisions", icon: MessagesSquare, implemented: true, phase: "Phase 2" },
  { href: "/os/billing", label: "Time & Billing", icon: Receipt, implemented: false, phase: "Phase 3" },
  { href: "/os/documents", label: "Documents", icon: FolderClosed, implemented: true, phase: "Phase 1" },
  { href: "/os/team", label: "Team & Capacity", icon: Users, implemented: true, phase: "Phase 2" },
  { href: "/os/reports", label: "Reports & Analytics", icon: BarChart3, implemented: true, phase: "Phase 2" },
  { href: "/os/templates", label: "Templates & Automations", icon: Workflow, implemented: true, phase: "Phase 1" },
  { href: "/os/settings", label: "Settings & Security", icon: Settings, implemented: true, phase: "Phase 0" },
];
