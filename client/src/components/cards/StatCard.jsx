import { Card } from "../ui/card";

const StatCard = ({ stat }) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">{stat.label}</p>
        <span className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/6 dark:text-white/70">
          {stat.trend}
        </span>
      </div>
      <div className="mt-10">
        <h3 className="text-4xl font-semibold tracking-[-0.04em]">{stat.value.toLocaleString?.() || stat.value}</h3>
        <div className="mt-6 h-px w-full bg-[linear-gradient(90deg,rgba(15,23,42,0.18),transparent)] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.35),transparent)]" />
      </div>
    </Card>
  );
};

export default StatCard;




