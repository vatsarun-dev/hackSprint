import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import { updateProfile } from "../../../redux/slices/authSlice";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

const EditProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { register, handleSubmit } = useForm({
    values: {
      name: user?.name || "",
      username: user?.username || "",
      title: user?.title || "",
      location: user?.location || "",
      bio: user?.bio || "",
      skills: user?.skills?.join(", ") || "",
    },
  });
  const currentSkills = user?.skills?.length
    ? user.skills
    : ["React", "Tailwind CSS", "Redux Toolkit"];

  const onSubmit = async (values) => {
    const payload = new FormData();
    payload.append("name", values.name);
    payload.append("username", values.username);
    payload.append("title", values.title || "");
    payload.append("location", values.location || "");
    payload.append("bio", values.bio || "");
    payload.append("summary", values.bio || "");
    payload.append("skills", values.skills || "");
    if (values.avatar?.[0]) {
      payload.append("profilePicture", values.avatar[0]);
    }

    const updatedUser = await dispatch(updateProfile(payload)).unwrap();
    navigate(
      `/profile/${updatedUser.username || values.username || user?.username}`,
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-900/60 p-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/80">
            Profile editor
          </p>
          <h1 className="mt-3 text-3xl font-semibold">
            Build your public profile
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Save your name, role, location, bio, skills, and avatar. Your public
            profile updates immediately.
          </p>
        </div>
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || "Profile"}
            className="h-20 w-20 rounded-2xl object-cover"
          />
        ) : null}
      </div>
      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-5 lg:grid-cols-2"
        >
          <div className="space-y-4">
            <Input
              placeholder="Full name"
              {...register("name", { required: true })}
            />
            <Input
              placeholder="Username"
              {...register("username", { required: true })}
            />
            {/* <Input placeholder="Role" {...register("title")} /> */}
            <Input placeholder="Location" {...register("location")} />
            <Input
              type="file"
              accept="image/*"
              {...register("avatar")}
              className="pt-3"
            />
          </div>
          <div className="space-y-4">
            <Textarea
              placeholder="Tell the community what you build"
              {...register("bio")}
              className="min-h-40"
            />
            <Input
              placeholder="Skills, separated by commas"
              {...register("skills")}
            />
            <div>
              <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
                Top skills
              </p>
              <div className="flex flex-wrap gap-2">
                {currentSkills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <Button type="submit">
              <Save className="h-4 w-4" />
              Save profile
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditProfilePage;
