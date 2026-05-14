import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/45 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-zinc-950 px-5 py-3 text-white shadow-[0_14px_32px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 hover:bg-zinc-800 dark:border dark:border-lime-300/30 dark:bg-[linear-gradient(135deg,#f5f5f4,#bef264)] dark:text-zinc-950 dark:shadow-[0_16px_42px_rgba(190,242,100,0.18)] dark:hover:bg-[linear-gradient(135deg,#ffffff,#a3e635)]",
        secondary:
          "border border-zinc-300 bg-white px-5 py-3 text-zinc-900 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-800",
        ghost:
          "px-3 py-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
        danger: "border border-red-400/30 bg-red-500/10 px-5 py-3 text-red-700 hover:bg-red-500/20 dark:text-red-100",
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



