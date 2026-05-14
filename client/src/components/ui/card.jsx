import { cn } from "../../lib/utils";

export const Card = ({ className, ...props }) => {
  return <div className={cn("glass-panel rounded-[28px] p-5", className)} {...props} />;
};
