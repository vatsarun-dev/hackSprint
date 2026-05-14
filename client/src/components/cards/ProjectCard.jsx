import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project.id}`} className="block h-full">
      <Card className="group h-full overflow-hidden p-0 transition duration-300 hover:-translate-y-1">
        <img src={project.image} alt={project.title} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="p-5">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <span className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
              <Heart className="h-4 w-4" />
              {project.likes}
            </span>
          </div>
          <p className="mt-3 text-sm text-[var(--muted-foreground)]">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
          <p className="mt-5 text-sm text-[var(--muted-foreground)]">by {project.author.name}</p>
        </div>
      </Card>
    </Link>
  );
};

export default ProjectCard;
