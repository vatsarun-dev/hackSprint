import { cn } from "../../lib/utils";

export const Card = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:shadow-[0_18px_60px_rgba(0,0,0,0.22)]",
        className,
      )}
      {...props}
    />
  );
};



