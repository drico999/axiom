import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { StatCard } from "@/components/stat-card";
import { aiUsage, weeklyActivity, stats } from "@/lib/mock-data";
import { Area, AreaChart, CartesianGrid, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — AI Solution Hub" }] }),
  component: AnalyticsPage,
});

const breakdown = [
  { name: "Summaries", value: 42 },
  { name: "Insights", value: 28 },
  { name: "Sentiment", value: 18 },
  { name: "Chat", value: 12 },
];
const COLORS = ["var(--brand)", "var(--brand-2)", "var(--chart-3)", "var(--chart-4)"];

function AnalyticsPage() {
  return (
    <>
      <TopBar title="Analytics" subtitle="A clear view of AI productivity across your workspaces." />
      <div className="p-6 space-y-6 pb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.04} />)}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-5 lg:col-span-2">
            <div className="text-sm font-semibold">AI Usage Trend</div>
            <div className="text-xs text-muted-foreground mb-4">Total chats + insights · last 6 months</div>
            <div className="h-72">
              <ResponsiveContainer>
                <AreaChart data={aiUsage}>
                  <defs>
                    <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="oklch(0.7 0.03 270)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.7 0.03 270)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                  <Area type="monotone" dataKey="chat" stroke="var(--brand)" fill="url(#ag)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="text-sm font-semibold">Request Mix</div>
            <div className="text-xs text-muted-foreground mb-4">Where AI time is spent</div>
            <div className="h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={breakdown} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3} stroke="none">
                    {breakdown.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="text-sm font-semibold mb-4">Productivity by Day</div>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={weeklyActivity}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="oklch(0.7 0.03 270)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.7 0.03 270)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="requests" stroke="var(--brand)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--brand)" }} />
                <Line type="monotone" dataKey="summaries" stroke="var(--brand-2)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--brand-2)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
