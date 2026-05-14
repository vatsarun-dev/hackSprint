import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

export const Tabs = TabsPrimitive.Root;

export const TabsList = ({ className, ...props }) => (
  <TabsPrimitive.List
    className={cn("inline-flex rounded-2xl border border-white/10 bg-white/6 p-1", className)}
    {...props}
  />
);

export const TabsTrigger = ({ className, ...props }) => (
  <TabsPrimitive.Trigger
    className={cn(
      "rounded-xl px-4 py-2 text-sm text-[var(--muted-foreground)] transition data-[state=active]:bg-white data-[state=active]:text-slate-950 dark:data-[state=active]:bg-white/12 dark:data-[state=active]:text-white",
      className,
    )}
    {...props}
  />
);

export const TabsContent = ({ className, ...props }) => (
  <TabsPrimitive.Content className={cn("mt-6", className)} {...props} />
);
