import { cn } from "../../lib/utils";

export const Badge = ({ className, children }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-zinc-300 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-300",
        className,
      )}
    >
      {children}
    </span>
  );
};



