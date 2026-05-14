import { Card } from "../ui/card";

const StatCard = ({ stat }) => {
  return (
    <Card className="overflow-hidden">
      <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <h3 className="text-3xl font-semibold">{stat.value.toLocaleString?.() || stat.value}</h3>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
          {stat.trend}
        </span>
      </div>
    </Card>
  );
};

export default StatCard;
