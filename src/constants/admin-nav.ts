import { Blocks, Crown, LayoutDashboard, MessageSquareText, Users } from "lucide-react";

export const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Modules", href: "/admin/modules", icon: Blocks },
  { label: "Custom Requests", href: "/admin/custom-requests", icon: MessageSquareText },
  { label: "Users & Visitors", href: "/admin/users", icon: Users },
  { label: "Accounts", href: "/admin/account", icon: Crown },
];
