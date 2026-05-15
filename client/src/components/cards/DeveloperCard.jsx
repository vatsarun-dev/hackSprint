import { Link } from "react-router-dom";
import { ArrowUpRight, Orbit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const DeveloperCard = ({ developer }) => {
  return (
    <Card className="group relative h-full overflow-hidden p-0 transition duration-500 hover:-translate-y-1">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_38%)]" />
      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 rounded-full border border-zinc-200 dark:border-white/10">
              <AvatarImage src={developer.avatar} alt={developer.name} />
              <AvatarFallback>{developer.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{developer.name}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{developer.title}</p>
            </div>
          </div>
          <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-zinc-600 dark:text-white/70">
            {developer.followers}
          </span>
        </div>
        <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-white/60">
          <Orbit className="h-3.5 w-3.5" />
          Discovery signal
        </div>
        <p className="mt-4 max-w-md text-sm leading-7 text-zinc-600 dark:text-zinc-400">{developer.bio}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {developer.skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-white/8 pt-5">
          <Link to={`/profile/${developer.username}`} className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-white/80">
            View profile
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Button variant="secondary" size="sm">
            Follow
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DeveloperCard;




