import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Briefcase,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

export const ADMIN_NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/contacts", label: "Contacts", icon: MessageSquare },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
];
