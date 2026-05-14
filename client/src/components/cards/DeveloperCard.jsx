import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const DeveloperCard = ({ developer }) => {
  return (
    <Card className="group h-full transition duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={developer.avatar} alt={developer.name} />
            <AvatarFallback>{developer.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{developer.name}</p>
            <p className="text-sm text-[var(--muted-foreground)]">{developer.title}</p>
          </div>
        </div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
          {developer.followers}
        </span>
      </div>
      <p className="mt-4 text-sm text-[var(--muted-foreground)]">{developer.bio}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {developer.skills.map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Link to={`/profile/${developer.username}`} className="inline-flex items-center gap-2 text-sm font-medium text-indigo-300">
          View profile
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        <Button variant="secondary" size="sm">
          Follow
        </Button>
      </div>
    </Card>
  );
};

export default DeveloperCard;
