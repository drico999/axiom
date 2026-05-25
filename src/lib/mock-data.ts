// Mock data powering analytics, dashboard widgets, and report views.

export const stats = [
  { label: "Workspaces", value: 12, delta: "+2 this week", icon: "Layers" },
  { label: "AI Requests", value: 4820, delta: "+18.2% vs last week", icon: "Sparkles" },
  { label: "Productivity Score", value: 92, suffix: "/100", delta: "+4 pts", icon: "Gauge" },
  { label: "Reports Generated", value: 37, delta: "+6 this month", icon: "FileText" },
] as const;

export const weeklyActivity = [
  { day: "Mon", requests: 320, summaries: 24 },
  { day: "Tue", requests: 410, summaries: 31 },
  { day: "Wed", requests: 380, summaries: 28 },
  { day: "Thu", requests: 520, summaries: 42 },
  { day: "Fri", requests: 610, summaries: 51 },
  { day: "Sat", requests: 290, summaries: 18 },
  { day: "Sun", requests: 240, summaries: 14 },
];

export const aiUsage = [
  { month: "Jan", chat: 1200, insights: 400 },
  { month: "Feb", chat: 1800, insights: 620 },
  { month: "Mar", chat: 2100, insights: 780 },
  { month: "Apr", chat: 2600, insights: 940 },
  { month: "May", chat: 3200, insights: 1180 },
  { month: "Jun", chat: 4100, insights: 1490 },
];

export const recentReports = [
  { id: "r1", title: "Q2 Customer Sentiment Analysis", type: "Sentiment", date: "2h ago", score: 0.82 },
  { id: "r2", title: "Onboarding Funnel Insights", type: "Insights", date: "Yesterday", score: 0.71 },
  { id: "r3", title: "Competitor Landscape Summary", type: "Summary", date: "2 days ago", score: 0.65 },
  { id: "r4", title: "Support Ticket Themes", type: "Themes", date: "3 days ago", score: 0.78 },
];

export const teamActivity = [
  { user: "Amara K.", action: "generated a summary in", target: "Sales Q2", time: "5m" },
  { user: "Diego R.", action: "uploaded 12 docs to", target: "Product Research", time: "22m" },
  { user: "Priya N.", action: "exported a report from", target: "Customer Voice", time: "1h" },
  { user: "Liam O.", action: "started a chat in", target: "Onboarding", time: "3h" },
];

export const promptTemplates = [
  { title: "Summarize meeting notes", prompt: "Summarize the following meeting notes into 5 key decisions and 5 action items with owners." },
  { title: "Generate business ideas", prompt: "Generate 5 SaaS business ideas in the HR-tech space for African SMEs. Include target user and revenue model." },
  { title: "Sentiment analysis", prompt: "Analyze the sentiment of these customer reviews and return positive / neutral / negative breakdown with example quotes." },
  { title: "Competitor scan", prompt: "Based on this competitor description, list strengths, weaknesses, and 3 ways we could differentiate." },
];

export const workspaces = [
  { id: "w1", name: "Sales Q2", docs: 24, members: 6, color: "from-violet-500 to-fuchsia-500" },
  { id: "w2", name: "Product Research", docs: 41, members: 9, color: "from-blue-500 to-cyan-500" },
  { id: "w3", name: "Customer Voice", docs: 18, members: 4, color: "from-pink-500 to-rose-500" },
  { id: "w4", name: "Onboarding", docs: 12, members: 3, color: "from-emerald-500 to-teal-500" },
];
