import { cn } from "../../lib/utils";

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl border border-zinc-300 bg-white/80 px-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-500 focus:border-cyan-500/70 focus:bg-white dark:border-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-300/70 dark:focus:bg-zinc-950",
        className,
      )}
      {...props}
    />
  );
};



