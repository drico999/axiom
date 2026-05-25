import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { recentReports } from "@/lib/mock-data";
import { Download, Search, Sparkles, Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({ meta: [{ title: "Reports — AI Solution Hub" }] }),
  component: ReportsPage,
});

const all = [
  ...recentReports,
  { id: "r5", title: "Pricing Page A/B Test Synthesis", type: "Insights", date: "5 days ago", score: 0.74 },
  { id: "r6", title: "Churn Risk Themes — Enterprise Tier", type: "Themes", date: "1 week ago", score: 0.69 },
  { id: "r7", title: "Investor Q&A Prep Pack", type: "Summary", date: "1 week ago", score: 0.81 },
];

function ReportsPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<string>("All");
  const types = ["All", "Summary", "Insights", "Sentiment", "Themes"];
  const filtered = all
    .filter((r) => r.title.toLowerCase().includes(q.toLowerCase()))
    .filter((r) => type === "All" || r.type === type);

  return (
    <>
      <TopBar title="Reports" subtitle="Polished, exportable AI-generated reports." />
      <div className="p-6 space-y-6 pb-24">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass w-full sm:w-80">
            <Search className="size-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search reports…" className="bg-transparent outline-none text-sm w-full" />
          </div>
          <div className="flex items-center gap-1 p-1 rounded-xl glass">
            <Filter className="size-3.5 ml-2 text-muted-foreground" />
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs transition ${type === t ? "gradient-brand text-white shadow-glow" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-muted-foreground uppercase tracking-wider">
              <tr className="border-b border-border">
                <th className="px-5 py-3">Report</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Score</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-border/60 hover:bg-white/[0.03] transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg gradient-brand grid place-items-center shadow-glow">
                        <Sparkles className="size-4 text-white" />
                      </div>
                      <div className="font-medium">{r.title}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{r.type}</td>
                  <td className="px-5 py-4 font-mono text-emerald-400">{Math.round(r.score * 100)}</td>
                  <td className="px-5 py-4 text-muted-foreground">{r.date}</td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => toast.success("Report exported (demo)")} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg glass hover:bg-white/10 transition">
                      <Download className="size-3" /> Export
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-16 text-center text-sm text-muted-foreground">No reports match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
