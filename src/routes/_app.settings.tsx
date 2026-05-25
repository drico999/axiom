import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { useState } from "react";
import { toast } from "sonner";
import { Moon, Sun, Bell, Shield, Cpu, Save } from "lucide-react";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — AI Solution Hub" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [name, setName] = useState("Amara Khoza");
  const [email, setEmail] = useState("amara@solutionhub.ai");
  const [model, setModel] = useState("google/gemini-3-flash-preview");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [notify, setNotify] = useState(true);

  return (
    <>
      <TopBar title="Settings" subtitle="Personalize your AI workspace." />
      <div className="p-6 space-y-6 pb-24 max-w-4xl">
        {/* Profile */}
        <section className="glass rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl gradient-brand grid place-items-center text-xl font-semibold text-white shadow-glow">AK</div>
            <div>
              <div className="text-lg font-semibold">{name}</div>
              <div className="text-sm text-muted-foreground">{email}</div>
            </div>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Field label="Full name" value={name} onChange={setName} />
            <Field label="Email" value={email} onChange={setEmail} type="email" />
          </div>
        </section>

        {/* AI */}
        <section className="glass rounded-2xl p-6">
          <SectionTitle icon={<Cpu className="size-4" />} title="AI preferences" desc="Choose which model powers your assistant." />
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {[
              "google/gemini-3-flash-preview",
              "google/gemini-2.5-pro",
              "openai/gpt-5-mini",
              "openai/gpt-5",
            ].map((m) => (
              <button
                key={m}
                onClick={() => setModel(m)}
                className={`text-left p-3 rounded-xl border transition ${model === m ? "border-primary bg-primary/10" : "border-border hover:bg-white/5"}`}
              >
                <div className="text-sm font-medium">{m}</div>
                <div className="text-xs text-muted-foreground mt-1">Routed via Lovable AI Gateway</div>
              </button>
            ))}
          </div>
        </section>

        {/* Appearance */}
        <section className="glass rounded-2xl p-6">
          <SectionTitle icon={theme === "dark" ? <Moon className="size-4" /> : <Sun className="size-4" />} title="Appearance" desc="Currently optimized for dark mode." />
          <div className="mt-4 flex gap-2">
            <Pill active={theme === "dark"} onClick={() => setTheme("dark")}><Moon className="size-3.5" /> Dark</Pill>
            <Pill active={theme === "light"} onClick={() => setTheme("light")}><Sun className="size-3.5" /> Light</Pill>
          </div>
        </section>

        {/* Notifications */}
        <section className="glass rounded-2xl p-6">
          <SectionTitle icon={<Bell className="size-4" />} title="Notifications" desc="Get alerted when AI jobs finish." />
          <Toggle on={notify} onChange={setNotify} label="Email me when reports are ready" />
        </section>

        {/* Security */}
        <section className="glass rounded-2xl p-6">
          <SectionTitle icon={<Shield className="size-4" />} title="Security" desc="Your workspace is isolated and audit-logged." />
          <div className="mt-3 text-xs text-muted-foreground">Two-factor authentication: <span className="text-emerald-400">Enabled</span></div>
        </section>

        <div className="flex justify-end">
          <button
            onClick={() => toast.success("Settings saved")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-brand text-white text-sm font-medium shadow-glow hover:opacity-90 transition"
          >
            <Save className="size-4" /> Save changes
          </button>
        </div>
      </div>
    </>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full bg-input/40 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition" />
    </label>
  );
}

function SectionTitle({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="size-9 rounded-lg gradient-brand grid place-items-center shadow-glow text-white">{icon}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs ${active ? "gradient-brand text-white shadow-glow" : "glass text-muted-foreground hover:text-foreground"}`}>{children}</button>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="text-sm">{label}</div>
      <button onClick={() => onChange(!on)} className={`w-11 h-6 rounded-full p-0.5 transition ${on ? "gradient-brand" : "bg-muted"}`}>
        <div className={`size-5 rounded-full bg-white transition-transform ${on ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}
