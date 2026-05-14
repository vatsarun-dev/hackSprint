import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "magnetic-button bg-[linear-gradient(135deg,rgba(102,90,255,0.96),rgba(87,171,255,0.92))] px-6 py-3.5 text-white shadow-[0_20px_60px_rgba(76,104,255,0.28)] hover:-translate-y-0.5 hover:shadow-[0_30px_80px_rgba(76,104,255,0.34)]",
        secondary:
          "magnetic-button border border-white/12 bg-white/6 px-6 py-3.5 text-[var(--foreground)] backdrop-blur-xl hover:bg-white/10",
        ghost: "px-3 py-2 text-[var(--muted-foreground)] hover:bg-white/6 hover:text-[var(--foreground)]",
      },
      size: {
        default: "",
        sm: "px-4 py-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export const Button = ({ className, variant, size, ...props }) => {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
};
