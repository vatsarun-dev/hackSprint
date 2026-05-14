import { Card } from "../ui/card";

const ActivityCard = ({ activity, index }) => {
  return (
    <Card className="flex items-start gap-4">
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#8b5cf6,#3b82f6)] text-sm font-semibold text-white">
        0{index + 1}
      </div>
      <div>
        <p className="font-medium">Latest platform activity</p>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">{activity}</p>
      </div>
    </Card>
  );
};

export default ActivityCard;
