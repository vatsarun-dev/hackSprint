import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../../redux/slices/projectsSlice";
import { useDebounce } from "../../../hooks/useDebounce";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import ProjectCard from "../../../components/cards/ProjectCard";

const tags = ["All", "Analytics", "SaaS", "Developer Tools", "Community", "Writing"];

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const projects = useSelector((state) => state.projects.items);
  const user = useSelector((state) => state.auth.user);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const debouncedQuery = useDebounce(query, 300);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesQuery =
        project.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(debouncedQuery.toLowerCase());
      const matchesTag = activeTag === "All" || project.tags?.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [activeTag, debouncedQuery, projects]);

  const myProjects = useMemo(
    () => projects.filter((project) => project.author?.username === user?.username),
    [projects, user?.username],
  );

  const handleDelete = (projectId) => {
    dispatch(deleteProject(projectId));
  };

  const projectBasePath = location.pathname.startsWith("/dashboard") ? "/dashboard/projects" : "/projects";

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

      <Card className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-zinc-500 dark:text-cyan-200/80">Project CRUD</p>
          <h2 className="mt-3 text-2xl font-semibold">Manage your projects</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Create a new project, open one to edit details, or remove old work from your profile.
          </p>
          <Link to="/projects/create" className="mt-5 inline-flex">
            <Button>
              <Plus className="h-4 w-4" />
              New project
            </Button>
          </Link>
        </div>
        <div className="grid gap-3">
          {myProjects.length ? (
            myProjects.map((project) => (
              <div
                key={project.id}
                className="grid gap-4 rounded-2xl border border-zinc-300 bg-zinc-50 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60 dark:shadow-none sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div>
                  <p className="font-medium">{project.title}</p>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm" onClick={() => navigate(`${projectBasePath}/${project.id}?edit=1`)}>
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(project.databaseId)}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-400 p-5 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-400">
              No projects created by this account yet.
            </div>
          )}
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
        {filteredProjects.map((project) => (
          <div key={project.id} className="mb-6 break-inside-avoid">
            <ProjectCard project={project} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProjectsPage;




