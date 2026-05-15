import { Card } from "../ui/card";

const ActivityCard = ({ activity, index }) => {
  return (
    <Card className="flex items-start gap-4">
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-zinc-50 text-sm font-semibold text-zinc-900 dark:border-white/10 dark:bg-white dark:text-black">
        0{index + 1}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">Latest platform activity</p>
        <p className="mt-3 text-sm leading-7 text-zinc-700 dark:text-zinc-400">{activity}</p>
      </div>
    </Card>
  );
};

export default ActivityCard;




