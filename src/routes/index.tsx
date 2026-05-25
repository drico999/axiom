import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, MessageSquare, BarChart3, FileText, Shield, Zap, Brain } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Solution Hub — Your enterprise AI business assistant" },
      { name: "description", content: "Upload data, chat with AI, generate insights, summaries, and reports. The premium AI workspace for modern teams." },
      { property: "og:title", content: "AI Solution Hub" },
      { property: "og:description", content: "Premium AI business assistant for teams." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg gradient-brand grid place-items-center shadow-glow">
              <Sparkles className="size-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">AI Solution Hub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#workflow" className="hover:text-foreground transition">Workflow</a>
            <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          </nav>
          <Link to="/dashboard" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-brand text-white text-sm font-medium shadow-glow hover:opacity-90 transition">
            Launch app <ArrowRight className="size-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-aurora">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 relative">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground mb-6">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              New · GPT-powered insights engine
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
              The <span className="gradient-text">AI workspace</span> for modern business teams.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Upload documents, chat with an enterprise AI assistant, and turn raw data into summaries, sentiment, and recommendations — in one elegant workspace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl gradient-brand text-white font-medium shadow-glow hover:opacity-90 transition">
                Open dashboard <ArrowRight className="size-4" />
              </Link>
              <Link to="/assistant" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass text-sm font-medium hover:bg-white/10 transition">
                Try the AI assistant
              </Link>
            </div>
          </motion.div>

          {/* Hero mock card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 glass-strong rounded-3xl p-3 shadow-glow"
          >
            <div className="rounded-2xl bg-card/60 backdrop-blur p-6 grid md:grid-cols-3 gap-4">
              {[
                { icon: Brain, label: "Active model", value: "Gemini · Flash" },
                { icon: Zap, label: "Avg response", value: "1.2s" },
                { icon: Shield, label: "Privacy", value: "SOC-2 ready" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-xl p-4 flex items-center gap-3">
                  <div className="size-10 rounded-lg gradient-brand grid place-items-center shadow-glow">
                    <s.icon className="size-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                    <div className="text-sm font-semibold">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-primary mb-3">Capabilities</div>
          <h2 className="text-4xl font-semibold tracking-tight">Everything your team needs from AI, in one place.</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { icon: MessageSquare, title: "AI Assistant", desc: "Conversational GPT-powered assistant trained on your business context." },
            { icon: FileText, title: "Document Insights", desc: "Drop in text or files and get instant summaries, themes, and sentiment." },
            { icon: BarChart3, title: "Smart Analytics", desc: "Beautiful charts surface productivity, AI usage, and team activity." },
            { icon: Brain, title: "Recommendations", desc: "Actionable, ranked business recommendations grounded in your data." },
            { icon: Zap, title: "Prompt Templates", desc: "A curated library of prompts for sales, research, and operations." },
            { icon: Shield, title: "Enterprise-grade", desc: "Workspace isolation, audit-ready exports, and role-aware access." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl p-6 hover:bg-white/[0.06] transition group"
            >
              <div className="size-10 rounded-lg gradient-brand grid place-items-center shadow-glow mb-4">
                <f.icon className="size-5 text-white" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="max-w-7xl mx-auto px-6 py-24">
        <div className="glass-strong rounded-3xl p-10 md:p-16 bg-aurora">
          <h2 className="text-4xl font-semibold tracking-tight max-w-2xl">From raw data to executive insight in three steps.</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Upload", d: "Drop documents, paste text, or connect a workspace." },
              { n: "02", t: "Ask", d: "Chat with your data using natural language prompts." },
              { n: "03", t: "Act", d: "Export polished reports and recommendations." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl p-6 bg-card/60 border border-border">
                <div className="text-xs gradient-text font-mono">{s.n}</div>
                <div className="mt-2 text-xl font-semibold">{s.t}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Ship AI workflows your team will actually use.</h2>
        <p className="mt-4 text-muted-foreground">Start free. Upgrade when your workspaces grow.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-medium shadow-glow hover:opacity-90 transition">
            Get started <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-8 text-xs text-muted-foreground flex items-center justify-between">
          <div>© 2026 AI Solution Hub</div>
          <div>Built with Lovable AI</div>
        </div>
      </footer>
    </div>
  );
}
