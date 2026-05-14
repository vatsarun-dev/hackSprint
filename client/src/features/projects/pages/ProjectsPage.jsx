import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { projects } from "../../../lib/mock-data";
import { useDebounce } from "../../../hooks/useDebounce";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import ProjectCard from "../../../components/cards/ProjectCard";

const tags = ["All", "Analytics", "SaaS", "Developer Tools", "Community", "Writing"];

const ProjectsPage = () => {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const debouncedQuery = useDebounce(query, 300);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesQuery =
        project.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(debouncedQuery.toLowerCase());
      const matchesTag = activeTag === "All" || project.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [activeTag, debouncedQuery]);

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(139,92,246,0.14),rgba(59,130,246,0.05))] p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.22em] text-indigo-300">Explore projects</p>
        <h1 className="mt-3 text-4xl font-semibold">Discover developer work with product polish</h1>
        <p className="mt-4 max-w-2xl text-[var(--muted-foreground)]">
          Search by problem space, stack, or creator and browse a visually rich, GitHub-meets-Pinterest layout.
        </p>
      </section>
      <Card className="space-y-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-11" placeholder="Search projects, stacks, or product ideas" />
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button key={tag} onClick={() => setActiveTag(tag)}>
              <Badge className={activeTag === tag ? "border-indigo-400/40 bg-indigo-500/15 text-indigo-200" : ""}>{tag}</Badge>
            </button>
          ))}
        </div>
      </Card>
      <section className="columns-1 gap-5 md:columns-2 xl:columns-3">
        {filteredProjects.map((project) => (
          <div key={project.id} className="mb-5 break-inside-avoid">
            <ProjectCard project={project} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProjectsPage;
