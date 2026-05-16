import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Code2, ExternalLink, Pencil, Save, Trash2, X } from "lucide-react";
import {
  deleteProject,
  updateProject,
} from "../../../redux/slices/projectsSlice";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const projects = useSelector((state) => state.projects.items);
  const currentUser = useSelector((state) => state.auth.user);
  const project = useMemo(
    () => projects.find((item) => item.id === id),
    [id, projects],
  );
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm();

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

  const projectBasePath = location.pathname.startsWith("/dashboard")
    ? "/dashboard/projects"
    : "/projects";
  const mutationId = project.databaseId || project.id;
  const isOwner =
    currentUser?.id &&
    project.author?.id &&
    currentUser.id === project.author.id;

  const openEditor = () => {
    reset({
      title: project.title || "",
      description: project.description || "",
      techStack: (project.techStack || []).join(", "),
      features: (project.features || []).join(", "),
      tags: (project.tags || []).join(", "),
      github: project.github || "",
      live: project.live || "",
    });
    setError("");
    setIsEditing(true);
  };

  const closeEditor = () => {
    setIsEditing(false);
    setError("");
    reset();
  };

  const handleUpdateProject = async (formValues) => {
    setSubmitting(true);
    setError("");
    try {
      const payload = new FormData();
      payload.append("title", formValues.title);
      payload.append("description", formValues.description);
      payload.append("techStack", formValues.techStack || "");
      payload.append("features", formValues.features || "");
      payload.append("tags", formValues.tags || "");
      payload.append("githubUrl", formValues.github || "");
      payload.append("liveUrl", formValues.live || "");
      if (formValues.image?.[0]) {
        payload.append("thumbnail", formValues.image[0]);
      }

      const updatedProject = await dispatch(
        updateProject({ id: mutationId, payload }),
      ).unwrap();
      closeEditor();
      navigate(`${projectBasePath}/${updatedProject.id}`);
    } catch (updateError) {
      setError(updateError?.message || "Project update failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async () => {
    const confirmed = window.confirm("Delete this project permanently?");
    if (!confirmed) {
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await dispatch(deleteProject(mutationId)).unwrap();
      navigate(projectBasePath);
    } catch (deleteError) {
      setError(deleteError?.message || "Project delete failed");
    } finally {
      setSubmitting(false);
    }
  };

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

          {isOwner ? (
            <Card className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">
                    Project controls
                  </p>
                  {/* <h2 className="mt-2 text-2xl font-semibold">Update or delete this project</h2> */}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={isEditing ? closeEditor : openEditor}
                  >
                    {isEditing ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Pencil className="h-4 w-4" />
                    )}
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={handleDeleteProject}
                    disabled={submitting}
                  >
                    <Trash2 className="h-4 w-4" />
                    {submitting ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>

              {error ? (
                <p className="text-sm text-red-600 dark:text-red-300">
                  {error}
                </p>
              ) : null}

              {isEditing ? (
                <form
                  onSubmit={handleSubmit(handleUpdateProject)}
                  className="grid gap-4"
                >
                  <Input
                    placeholder="Project title"
                    {...register("title", { required: true })}
                  />
                  <Textarea
                    placeholder="Description"
                    {...register("description", { required: true })}
                  />
                  <Input placeholder="Tech stack" {...register("techStack")} />
                  <Input placeholder="Key features" {...register("features")} />
                  <Input placeholder="Tags" {...register("tags")} />
                  <Input placeholder="GitHub link" {...register("github")} />
                  <Input placeholder="Live link" {...register("live")} />
                  <Input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    className="pt-3"
                  />
                  <Button type="submit" disabled={submitting}>
                    <Save className="h-4 w-4" />
                    {submitting ? "Saving..." : "Save changes"}
                  </Button>
                </form>
              ) : null}
            </Card>
          ) : null}

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
