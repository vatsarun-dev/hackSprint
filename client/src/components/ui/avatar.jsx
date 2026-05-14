import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../../lib/utils";

export const Avatar = ({ className, ...props }) => (
  <AvatarPrimitive.Root className={cn("relative flex h-12 w-12 shrink-0 overflow-hidden rounded-2xl", className)} {...props} />
);

export const AvatarImage = AvatarPrimitive.Image;

export const AvatarFallback = ({ className, ...props }) => (
  <AvatarPrimitive.Fallback
    className={cn("flex h-full w-full items-center justify-center bg-indigo-500/20 text-sm font-semibold text-indigo-200", className)}
    {...props}
  />
);
