import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Code2, ExternalLink, MessageSquare } from "lucide-react";
import { projects } from "../../../lib/mock-data";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const project = useMemo(() => projects.find((item) => item.id === id) || projects[0], [id]);

  return (
    <div className="space-y-8">
      <img src={project.image} alt={project.title} className="h-72 w-full rounded-[36px] object-cover sm:h-96" />
      <section className="grid gap-6 lg:grid-cols-[1fr_0.35fr]">
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <h1 className="mt-4 text-4xl font-semibold">{project.title}</h1>
            <p className="mt-4 text-lg text-[var(--muted-foreground)]">{project.description}</p>
          </div>
          <Card>
            <h2 className="text-xl font-semibold">Full overview</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
              {project.title} helps teams turn raw engineering output into a compelling public story. The experience is built
              for clean onboarding, rich previews, and measurable product credibility.
            </p>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold">Key features</h2>
            <div className="mt-4 grid gap-3">
              {project.features.map((feature) => (
                <div key={feature} className="rounded-3xl border border-white/8 bg-white/5 px-4 py-3 text-sm">
                  {feature}
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-indigo-300" />
              <h2 className="text-xl font-semibold">Comments</h2>
            </div>
            <div className="mt-4 space-y-4">
              {["Love the clarity of the story here.", "Great component structure and launch polish."].map((comment) => (
                <div key={comment} className="rounded-3xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-[var(--muted-foreground)]">
                  {comment}
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card className="h-fit space-y-4">
          <div>
            <p className="text-sm text-[var(--muted-foreground)]">Built by</p>
            <p className="mt-1 text-xl font-semibold">{project.author.name}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
          <a href={project.github} target="_blank" rel="noreferrer">
            <Button className="w-full">
              <Code2 className="h-4 w-4" />
              GitHub
            </Button>
          </a>
          <a href={project.live} target="_blank" rel="noreferrer">
            <Button variant="secondary" className="w-full">
              <ExternalLink className="h-4 w-4" />
              Live demo
            </Button>
          </a>
        </Card>
      </section>
    </div>
  );
};

export default ProjectDetailsPage;
