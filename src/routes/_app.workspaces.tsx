import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { workspaces } from "@/lib/mock-data";
import { Plus, Users, FileText, Search } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("/_app/workspaces")({
  head: () => ({ meta: [{ title: "Workspaces — AI Solution Hub" }] }),
  component: WorkspacesPage,
});

function WorkspacesPage() {
  const [q, setQ] = useState("");
  const filtered = workspaces.filter((w) => w.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <TopBar title="Workspaces" subtitle="Organize your AI work by team or project." />
      <div className="p-6 space-y-6 pb-24">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass w-full sm:w-80">
            <Search className="size-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search workspaces…" className="bg-transparent outline-none text-sm w-full" />
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-brand text-white text-sm font-medium shadow-glow hover:opacity-90 transition">
            <Plus className="size-4" /> New workspace
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass rounded-2xl p-5 group hover:bg-white/[0.06] transition cursor-pointer"
            >
              <div className={`h-24 rounded-xl bg-gradient-to-br ${w.color} shadow-glow relative overflow-hidden`}>
                <div className="absolute inset-0 bg-grid opacity-30" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-semibold">{w.name}</h3>
                <div className="text-xs text-muted-foreground">Active</div>
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><FileText className="size-3" /> {w.docs} docs</span>
                <span className="flex items-center gap-1.5"><Users className="size-3" /> {w.members} members</span>
              </div>
            </motion.div>
          ))}

          {/* New card */}
          <button className="glass rounded-2xl p-5 border-2 border-dashed border-border hover:bg-white/[0.04] transition flex flex-col items-center justify-center min-h-[200px] text-muted-foreground">
            <div className="size-10 rounded-xl glass grid place-items-center"><Plus className="size-5" /></div>
            <div className="mt-2 text-sm">Create new workspace</div>
          </button>
        </div>
      </div>
    </>
  );
}
