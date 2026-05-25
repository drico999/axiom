import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, MessagesSquare, BarChart3, FileText, Settings, Layers } from "lucide-react";

const items = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { to: "/assistant", icon: MessagesSquare, label: "AI" },
  { to: "/analytics", icon: BarChart3, label: "Stats" },
  { to: "/workspaces", icon: Layers, label: "Spaces" },
  { to: "/reports", icon: FileText, label: "Reports" },
  { to: "/settings", icon: Settings, label: "Me" },
];

export function MobileTabBar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  return (
    <nav className="md:hidden fixed bottom-3 left-3 right-3 z-30 glass-strong rounded-2xl px-2 py-1.5 flex justify-between">
      {items.map((i) => {
        const active = pathname.startsWith(i.to);
        return (
          <Link key={i.to} to={i.to} className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl text-[10px] ${active ? "text-white gradient-brand" : "text-muted-foreground"}`}>
            <i.icon className="size-4" />
            <span>{i.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
