import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { createProject } from "../../../redux/slices/projectsSlice";
import { splitCommaValues } from "../../../lib/content";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Badge } from "../../../components/ui/badge";

const CreateProjectPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [preview, setPreview] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const previewRegister = (name, options = {}) =>
    register(name, {
      ...options,
      onChange: (event) => setPreview((current) => ({ ...current, [name]: event.target.value })),
    });

  const onSubmit = async (formValues) => {
    setSubmitting(true);
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

      const project = await dispatch(createProject(payload)).unwrap();
      reset();
      const projectBasePath = location.pathname.startsWith("/dashboard") ? "/dashboard/projects" : "/projects";
      navigate(`${projectBasePath}/${project.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
      <Card>
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.22em] text-zinc-500 dark:text-white/60">Project creator</p>
          <h1 className="mt-3 text-3xl font-semibold">Publish a project with a live preview</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <Input placeholder="Project title" {...previewRegister("title", { required: true })} />
          <Textarea placeholder="Description" {...previewRegister("description", { required: true })} />
          <Input placeholder="Tech stack" {...previewRegister("techStack")} />
          <Input placeholder="Key features" {...register("features")} />
          <Input placeholder="GitHub link" {...register("github")} />
          <Input placeholder="Live link" {...register("live")} />
          <Input type="file" accept="image/*" {...register("image")} className="pt-3" />
          <Input placeholder="Tags" {...previewRegister("tags")} />
          <Button type="submit" disabled={submitting}>
            {submitting ? "Publishing..." : "Create project"}
          </Button>
        </form>
      </Card>
      <Card className="h-fit">
        <div className="mb-5 flex items-center gap-2">
          <Eye className="h-4 w-4 text-zinc-600 dark:text-white/70" />
          <p className="text-sm font-medium">Realtime preview</p>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-zinc-300 bg-zinc-50 shadow-sm dark:border-white/8 dark:bg-white/5 dark:shadow-none">
          <div className="h-52 bg-[linear-gradient(135deg,rgba(226,232,240,0.9),rgba(248,250,252,0.6))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
          <div className="p-5">
            <h2 className="text-2xl font-semibold">{preview.title || "Project title preview"}</h2>
            <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-400">
              {preview.description || "Your project description will appear here as you type."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {splitCommaValues(preview.techStack).map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {splitCommaValues(preview.tags).map((item) => (
                <Badge key={item} className="text-zinc-800 dark:text-white">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateProjectPage;




