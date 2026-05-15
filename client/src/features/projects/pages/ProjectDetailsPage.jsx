import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Code2, ExternalLink } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const projects = useSelector((state) => state.projects.items);
  const project = useMemo(
    () => projects.find((item) => item.id === id),
    [id, projects],
  );

  if (!project) {
    return (
      <Card className="">
        <p className="text-lg font-semibold">Project not found</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          This project may have been removed.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-10">
      <img
        src={project.image}
        alt={project.title}
        className="h-80 w-full rounded-[2.8rem] object-cover sm:h-[30rem]"
      />
      <section className="grid gap-8 lg:grid-cols-[1fr_0.38fr]">
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap gap-2">
              {(project.tags || []).map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>
          </div>

          <Card className="">
            <h2 className="text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">
              Full overview
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {project.title} helps teams turn raw engineering output into a
              compelling public story. The experience is built for clean
              onboarding, rich previews, and measurable product credibility.
            </p>
          </Card>
          <Card className="">
            <h2 className="text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">
              Key features
            </h2>
            <div className="mt-4 grid gap-3">
              {(project.features || []).map((feature) => (
                <div
                  key={feature}
                  className="rounded-[1.5rem] border border-zinc-300 bg-zinc-50 px-4 py-4 text-sm text-zinc-800 dark:border-white/8 dark:bg-white/5 dark:text-zinc-100"
                >
                  {feature}
                </div>
              ))}
            </div>
          </Card>
          {/* <Card className="">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-zinc-600 dark:text-white/70" />
              <h2 className="text-xl font-semibold">Comments</h2>
            </div>
            <div className="mt-4 space-y-4">
              {["Love the clarity of the story here.", "Great component structure and launch polish."].map((comment) => (
                <div key={comment} className="rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-white/8 dark:bg-white/5 dark:text-zinc-400">
                  {comment}
                </div>
              ))}
            </div>
          </Card> */}
        </div>
        <Card className="h-fit space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-zinc-600 dark:text-zinc-400">
              Built by
            </p>
            <p className="mt-3 text-2xl font-semibold">{project.author.name}</p>
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
