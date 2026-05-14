import { useForm } from "react-hook-form";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

const EditProfilePage = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "Aria Lennox",
      role: "Senior Frontend Engineer",
      location: "Bengaluru, India",
      bio: "Design systems, animation systems, and product-driven frontend architecture.",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-indigo-300">Profile editor</p>
        <h1 className="mt-3 text-3xl font-semibold">Shape how the community sees your work</h1>
      </div>
      <Card>
        <form onSubmit={handleSubmit(() => {})} className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <Input placeholder="Full name" {...register("name")} />
            <Input placeholder="Role" {...register("role")} />
            <Input placeholder="Location" {...register("location")} />
            <Input type="file" {...register("avatar")} className="pt-3" />
          </div>
          <div className="space-y-4">
            <Textarea placeholder="Tell the community what you build" {...register("bio")} className="min-h-40" />
            <div>
              <p className="mb-3 text-sm text-[var(--muted-foreground)]">Top skills</p>
              <div className="flex flex-wrap gap-2">
                {["React", "Tailwind CSS", "GSAP", "Redux Toolkit", "Developer Experience"].map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <Button type="submit">Save profile updates</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditProfilePage;
