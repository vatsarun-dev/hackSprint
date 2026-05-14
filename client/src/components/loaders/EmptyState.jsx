import { Sparkles } from "lucide-react";
import { Card } from "../ui/card";

const EmptyState = ({ title, description }) => {
  return (
    <Card className="flex flex-col items-center px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700 dark:bg-white/10 dark:text-white/80">
        <Sparkles className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </Card>
  );
};

export default EmptyState;



