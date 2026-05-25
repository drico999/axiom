import { Bell, Search } from "lucide-react";

export function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="h-16 flex items-center justify-between gap-4 px-6 border-b border-border bg-background/60 backdrop-blur-xl sticky top-0 z-20">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg glass w-72">
          <Search className="size-4 text-muted-foreground" />
          <input
            placeholder="Search reports, chats, workspaces…"
            className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground/70"
          />
          <kbd className="text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">⌘K</kbd>
        </div>
        <button className="size-9 grid place-items-center rounded-lg glass hover:bg-white/10 transition relative">
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-1.5 rounded-full bg-primary" />
        </button>
        <div className="size-9 rounded-full gradient-brand grid place-items-center text-xs font-semibold text-white shadow-glow">
          AK
        </div>
      </div>
    </header>
  );
}
