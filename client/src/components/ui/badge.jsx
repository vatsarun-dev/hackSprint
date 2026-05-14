import { cn } from "../../lib/utils";

export const Badge = ({ className, children }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium text-[var(--muted-foreground)]",
        className,
      )}
    >
      {children}
    </span>
  );
};
