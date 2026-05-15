import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

export const Tabs = TabsPrimitive.Root;

export const TabsList = ({ className, ...props }) => (
  <TabsPrimitive.List
    className={cn("inline-flex rounded-2xl border border-zinc-300 bg-zinc-100 p-1 dark:border-white/10 dark:bg-white/6", className)}
    {...props}
  />
);

export const TabsTrigger = ({ className, ...props }) => (
  <TabsPrimitive.Trigger
    className={cn(
      "rounded-xl px-4 py-2 text-sm font-medium text-zinc-700 transition data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm dark:text-zinc-400 dark:data-[state=active]:bg-white/12 dark:data-[state=active]:text-white dark:data-[state=active]:shadow-none",
      className,
    )}
    {...props}
  />
);

export const TabsContent = ({ className, ...props }) => (
  <TabsPrimitive.Content className={cn("mt-6", className)} {...props} />
);



