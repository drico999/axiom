import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { StatCard } from "@/components/stat-card";
import { stats, weeklyActivity, aiUsage, recentReports, teamActivity, promptTemplates } from "@/lib/mock-data";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — AI Solution Hub" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <>
      <TopBar title="Dashboard" subtitle="Welcome back, Amara — here's your workspace today." />
      <div className="p-6 space-y-6 pb-24">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.05} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="glass rounded-2xl p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold">AI Usage</div>
                <div className="text-xs text-muted-foreground">Chat vs. Insights over the last 6 months</div>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full" style={{ background: "var(--brand)" }} />Chat</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full" style={{ background: "var(--brand-2)" }} />Insights</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={aiUsage}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand-2)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--brand-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="oklch(0.7 0.03 270)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.7 0.03 270)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                  <Area type="monotone" dataKey="chat" stroke="var(--brand)" fill="url(#g1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="insights" stroke="var(--brand-2)" fill="url(#g2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="glass rounded-2xl p-5">
            <div className="text-sm font-semibold">Weekly Activity</div>
            <div className="text-xs text-muted-foreground">Requests · Summaries</div>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                  <XAxis dataKey="day" stroke="oklch(0.7 0.03 270)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.7 0.03 270)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                  <Bar dataKey="requests" fill="var(--brand)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="summaries" fill="var(--brand-2)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* AI quick card + recent reports */}
        <div className="grid lg:grid-cols-3 gap-4">
          <Link to="/assistant" className="lg:col-span-2 group">
            <div className="glass-strong rounded-2xl p-6 bg-aurora hover:shadow-glow transition">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs glass rounded-full px-3 py-1">
                    <Sparkles className="size-3" /> AI Assistant
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">Ask anything about your business data</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md">Summarize a doc, draft a strategy, run a sentiment pass, or generate recommendations.</p>
                </div>
                <ArrowRight className="size-5 text-muted-foreground group-hover:translate-x-1 transition" />
              </div>
              <div className="mt-6 grid sm:grid-cols-2 gap-2">
                {promptTemplates.slice(0, 4).map((p) => (
                  <div key={p.title} className="glass rounded-xl p-3 text-xs text-muted-foreground">
                    <div className="text-foreground font-medium mb-1">{p.title}</div>
                    {p.prompt.slice(0, 70)}…
                  </div>
                ))}
              </div>
            </div>
          </Link>

          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Recent Reports</div>
              <Link to="/reports" className="text-xs text-muted-foreground hover:text-foreground">View all</Link>
            </div>
            <div className="mt-4 space-y-3">
              {recentReports.map((r) => (
                <div key={r.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition">
                  <div className="size-9 rounded-lg gradient-brand grid place-items-center shadow-glow shrink-0">
                    <Sparkles className="size-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{r.title}</div>
                    <div className="text-[11px] text-muted-foreground">{r.type} · {r.date}</div>
                  </div>
                  <div className="text-xs font-mono text-emerald-400">{Math.round(r.score * 100)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team activity */}
        <div className="glass rounded-2xl p-5">
          <div className="text-sm font-semibold mb-4">Team Activity</div>
          <div className="space-y-3">
            {teamActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="size-8 rounded-full gradient-brand grid place-items-center text-[11px] font-semibold text-white">
                  {a.user.split(" ").map((p) => p[0]).join("")}
                </div>
                <div className="flex-1">
                  <span className="font-medium">{a.user}</span>{" "}
                  <span className="text-muted-foreground">{a.action}</span>{" "}
                  <span className="font-medium">{a.target}</span>
                </div>
                <div className="text-xs text-muted-foreground">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
