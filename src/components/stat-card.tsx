import { motion } from "motion/react";
import * as Icons from "lucide-react";

type StatCardProps = {
  label: string;
  value: number | string;
  suffix?: string;
  delta?: string;
  icon: keyof typeof Icons;
  delay?: number;
};

export function StatCard({ label, value, suffix, delta, icon, delay = 0 }: StatCardProps) {
  const Icon = Icons[icon] as React.ComponentType<{ className?: string }>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass rounded-2xl p-5 relative overflow-hidden group hover:bg-white/[0.06] transition"
    >
      <div className="absolute -top-12 -right-12 size-32 rounded-full gradient-brand opacity-20 blur-2xl group-hover:opacity-30 transition" />
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="size-8 rounded-lg gradient-brand grid place-items-center shadow-glow">
          {Icon && <Icon className="size-4 text-white" />}
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        {suffix && <div className="text-sm text-muted-foreground">{suffix}</div>}
      </div>
      {delta && <div className="mt-1 text-xs text-emerald-400">{delta}</div>}
    </motion.div>
  );
}
