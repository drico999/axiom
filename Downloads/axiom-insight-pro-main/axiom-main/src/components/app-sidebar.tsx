import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  MessagesSquare,
  BarChart3,
  FileText,
  Settings,
  Sparkles,
  Layers,
} from "lucide-react";

const items = [
  { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { title: "AI Assistant", to: "/assistant", icon: MessagesSquare },
  { title: "Analytics", to: "/analytics", icon: BarChart3 },
  { title: "Workspaces", to: "/workspaces", icon: Layers },
  { title: "Reports", to: "/reports", icon: FileText },
  { title: "Settings", to: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl">
      <Link to="/" className="flex items-center gap-2 px-6 h-16 border-b border-sidebar-border">
        <div className="size-8 rounded-lg gradient-brand grid place-items-center shadow-glow">
          <Sparkles className="size-4 text-white" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">AI Solution Hub</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Enterprise</div>
        </div>
      </Link>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => {
          const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                active
                  ? "gradient-brand text-white shadow-glow"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <item.icon className="size-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="m-3 rounded-xl p-4 glass">
        <div className="text-xs text-muted-foreground">Plan</div>
        <div className="text-sm font-semibold mt-0.5">Pro · Trial</div>
        <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-3/4 gradient-brand rounded-full" />
        </div>
        <div className="mt-2 text-[11px] text-muted-foreground">4,820 / 6,000 AI requests</div>
      </div>
    </aside>
  );
}
