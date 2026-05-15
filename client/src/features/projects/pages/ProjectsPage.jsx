import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDebounce } from "../../../hooks/useDebounce";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import ProjectCard from "../../../components/cards/ProjectCard";
import EmptyState from "../../../components/loaders/EmptyState";

const tags = ["All", "Analytics", "SaaS", "Developer Tools", "Community", "Writing"];

const ProjectsPage = () => {
  const projects = useSelector((state) => state.projects.items);
  const { loading, error, isBootstrapped } = useSelector((state) => state.projects);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const debouncedQuery = useDebounce(query, 300);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const title = project.title || "";
      const description = project.description || "";
      const matchesQuery =
        title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        description.toLowerCase().includes(debouncedQuery.toLowerCase());
      const matchesTag = activeTag === "All" || project.tags?.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [activeTag, debouncedQuery, projects]);

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500 dark:text-white/60">Explore projects</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl">
            Discover developer work with product polish.
          </h1>
        </div>
        <p className="max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 lg:ml-auto">
          Search by problem space, stack, or creator and browse a cinematic showcase system with more gallery energy
          than dashboard repetition.
        </p>
      </section>

      <Card>
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-zinc-500 dark:text-cyan-200/80">Project CRUD</p>
          <h2 className="mt-3 text-2xl font-semibold">Manage your projects</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Create a new project and publish it to your profile.
          </p>
          <Link to="/projects/create" className="mt-5 inline-flex">
            <Button>
              <Plus className="h-4 w-4" />
              New project
            </Button>
          </Link>
        </div>
      </Card>

      <Card className="space-y-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600 dark:text-zinc-400" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-11"
            placeholder="Search projects, stacks, or product ideas"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button key={tag} onClick={() => setActiveTag(tag)}>
              <Badge className={activeTag === tag ? "border-zinc-950 bg-zinc-950 text-white dark:border-white/20 dark:bg-white/10 dark:text-white" : ""}>{tag}</Badge>
            </button>
          ))}
        </div>
      </Card>
      <section className="columns-1 gap-6 md:columns-2 xl:columns-3">
        {loading && !isBootstrapped ? (
          <EmptyState title="Loading projects" description="Fetching project showcases from the backend." />
        ) : error ? (
          <EmptyState title="Projects could not load" description={error} />
        ) : filteredProjects.length ? (
          filteredProjects.map((project) => (
            <div key={project.id} className="mb-6 break-inside-avoid">
              <ProjectCard project={project} />
            </div>
          ))
        ) : (
          <EmptyState
            title="No projects found"
            description="Create the first project or try a broader search/filter."
          />
        )}
      </section>
    </div>
  );
};

export default ProjectsPage;




