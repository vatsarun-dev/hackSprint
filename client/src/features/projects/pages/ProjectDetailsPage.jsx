import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Code2, ExternalLink, MessageSquare, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { deleteProject, updateProject } from "../../../redux/slices/projectsSlice";
import { fileToDataUrl, splitCommaValues } from "../../../lib/content";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.items);
  const user = useSelector((state) => state.auth.user);
  const project = useMemo(() => projects.find((item) => item.id === id), [id, projects]);
  const [isEditing, setIsEditing] = useState(searchParams.get("edit") === "1");
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        description: project.description,
        techStack: project.techStack.join(", "),
        features: project.features.join(", "),
        tags: project.tags.join(", "),
        github: project.github,
        live: project.live,
      });
    }
  }, [project, reset]);

  if (!project) {
    return (
      <Card className="">
        <p className="text-lg font-semibold">Project not found</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">This project may have been removed.</p>
      </Card>
    );
  }

  const canManage = user?.username && project.author?.username === user.username;

  const onUpdate = async (values) => {
    const nextImage = (await fileToDataUrl(values.image?.[0])) || project.image;

    dispatch(
      updateProject({
        ...project,
        title: values.title,
        description: values.description,
        techStack: splitCommaValues(values.techStack),
        features: splitCommaValues(values.features),
        tags: splitCommaValues(values.tags),
        github: values.github,
        live: values.live,
        image: nextImage,
      }),
    );

    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteProject(project.id));
    navigate("/projects");
  };

  return (
    <div className="space-y-10">
      <img src={project.image} alt={project.title} className="h-80 w-full rounded-[2.8rem] object-cover sm:h-[30rem]" />
      <section className="grid gap-8 lg:grid-cols-[1fr_0.38fr]">
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-6xl">{project.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">{project.description}</p>
          </div>

          {canManage && (
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setIsEditing((value) => !value)}>
                <Pencil className="h-4 w-4" />
                {isEditing ? "Cancel edit" : "Edit project"}
              </Button>
              <Button variant="ghost" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          )}

          {canManage && isEditing ? (
            <Card className="">
              <form onSubmit={handleSubmit(onUpdate)} className="grid gap-4">
                <Input placeholder="Title" {...register("title")} />
                <Textarea placeholder="Description" {...register("description")} />
                <Input placeholder="Tech stack" {...register("techStack")} />
                <Input placeholder="Features" {...register("features")} />
                <Input placeholder="Tags" {...register("tags")} />
                <Input placeholder="GitHub link" {...register("github")} />
                <Input placeholder="Live link" {...register("live")} />
                <Input type="file" accept="image/*" {...register("image")} className="pt-3" />
                <Button type="submit">Save changes</Button>
              </form>
            </Card>
          ) : null}

          <Card className="">
            <h2 className="text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">Full overview</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {project.title} helps teams turn raw engineering output into a compelling public story. The experience is built
              for clean onboarding, rich previews, and measurable product credibility.
            </p>
          </Card>
          <Card className="">
            <h2 className="text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">Key features</h2>
            <div className="mt-4 grid gap-3">
              {project.features.map((feature) => (
                <div key={feature} className="rounded-[1.5rem] border border-white/8 bg-white/5 px-4 py-4 text-sm">
                  {feature}
                </div>
              ))}
            </div>
          </Card>
          <Card className="">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-zinc-600 dark:text-white/70" />
              <h2 className="text-xl font-semibold">Comments</h2>
            </div>
            <div className="mt-4 space-y-4">
              {["Love the clarity of the story here.", "Great component structure and launch polish."].map((comment) => (
                <div key={comment} className="rounded-3xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {comment}
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card className="h-fit space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-zinc-600 dark:text-zinc-400">Built by</p>
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




