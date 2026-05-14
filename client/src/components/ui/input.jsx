import { cn } from "../../lib/utils";

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-indigo-400/60 focus:bg-white/8",
        className,
      )}
      {...props}
    />
  );
};
