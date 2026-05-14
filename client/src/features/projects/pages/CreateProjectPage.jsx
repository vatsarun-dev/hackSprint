import { useForm } from "react-hook-form";
import { Eye } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Badge } from "../../../components/ui/badge";

const CreateProjectPage = () => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      title: "NovaBoard",
      description: "A premium developer dashboard for tracking releases, content, and community traction.",
      techStack: "React, Redux Toolkit, Tailwind CSS",
      github: "https://github.com",
      live: "https://vercel.com",
      tags: "Dashboard, SaaS, Community",
    },
  });
  const values = watch();

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
      <Card>
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.22em] text-indigo-300">Project creator</p>
          <h1 className="mt-3 text-3xl font-semibold">Publish a project with a live preview</h1>
        </div>
        <form onSubmit={handleSubmit(() => {})} className="grid gap-4">
          <Input placeholder="Project title" {...register("title")} />
          <Textarea placeholder="Description" {...register("description")} />
          <Input placeholder="Tech stack" {...register("techStack")} />
          <Input placeholder="GitHub link" {...register("github")} />
          <Input placeholder="Live link" {...register("live")} />
          <Input type="file" {...register("image")} className="pt-3" />
          <Input placeholder="Tags" {...register("tags")} />
          <Button type="submit">Create project</Button>
        </form>
      </Card>
      <Card className="h-fit">
        <div className="mb-5 flex items-center gap-2">
          <Eye className="h-4 w-4 text-indigo-300" />
          <p className="text-sm font-medium">Realtime preview</p>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-white/8 bg-white/5">
          <div className="h-52 bg-[linear-gradient(135deg,rgba(139,92,246,0.18),rgba(59,130,246,0.12))]" />
          <div className="p-5">
            <h2 className="text-2xl font-semibold">{values.title}</h2>
            <p className="mt-3 text-sm text-[var(--muted-foreground)]">{values.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(values.techStack || "")
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
                .map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {(values.tags || "")
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
                .map((item) => (
                  <Badge key={item} className="text-indigo-200">
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
