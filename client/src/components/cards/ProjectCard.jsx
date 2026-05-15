import { ArrowUpRight, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

const ProjectCard = ({ project }) => {
  const location = useLocation();
  const projectBasePath = location.pathname.startsWith("/dashboard") ? "/dashboard/projects" : "/projects";

  return (
    <Link to={`${projectBasePath}/${project.id}`} className="block h-full">
      <Card className="group h-full overflow-hidden p-0 transition duration-500 hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <img src={project.image} alt={project.title} className="h-64 w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(7,11,20,0.9))]" />
          <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
            <span className="rounded-full border border-white/12 bg-[rgba(7,11,20,0.55)] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/70 backdrop-blur-xl">
              {project.tags[0]}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-[rgba(7,11,20,0.55)] px-3 py-1 text-xs text-white/75 backdrop-blur-xl">
              <Heart className="h-4 w-4" />
              {project.likes}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">Project showcase</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">{project.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-5 dark:border-white/8">
            <p className="text-sm text-zinc-700 dark:text-zinc-400">by {project.author.name}</p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-white/80">
              Open
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProjectCard;



