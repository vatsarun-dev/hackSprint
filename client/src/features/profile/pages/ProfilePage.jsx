import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Code2, Download, Link2, MapPin, Share2 } from "lucide-react";
import { developers, profileSections } from "../../../lib/mock-data";
import { userService } from "../../../services/userService";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import ProjectCard from "../../../components/cards/ProjectCard";
import BlogCard from "../../../components/cards/BlogCard";

const ProfilePage = () => {
  const { username } = useParams();
  const user = useSelector((state) => state.auth.user);
  const projects = useSelector((state) => state.projects.items);
  const blogs = useSelector((state) => state.blogs.items);
  const [remoteProfile, setRemoteProfile] = useState({
    username: "",
    user: null,
    error: "",
  });
  const isOwnProfile = user?.username === username;

  useEffect(() => {
    let active = true;

    if (isOwnProfile) {
      return () => {
        active = false;
      };
    }

    userService
      .getProfile(username)
      .then((developer) => {
        if (active) {
          setRemoteProfile({ username, user: developer, error: "" });
        }
      })
      .catch((error) => {
        if (active) {
          setRemoteProfile({
            username,
            user: null,
            error: error.response?.data?.message || "Profile not found",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [isOwnProfile, username]);

  const profileUser = isOwnProfile ? user : remoteProfile.username === username ? remoteProfile.user : null;
  const loadingProfile = !isOwnProfile && remoteProfile.username !== username;
  const profileError = remoteProfile.username === username ? remoteProfile.error : "";

  const developer = useMemo(
    () => {
      if (!profileUser) return null;

      return {
        ...developers[0],
        ...profileUser,
        title: profileUser.title || "Developer",
        location: profileUser.location || "India",
        bio: profileUser.bio || "Building useful projects and learning in public.",
        skills: profileUser.skills?.length ? profileUser.skills : profileSections.skills,
        avatar: profileUser.avatar || developers[0].avatar,
        cover: profileUser.cover || developers[0].cover,
      };
    },
    [profileUser],
  );

  if (loadingProfile) {
    return (
      <Card>
        <p className="text-lg font-semibold">Loading profile</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Fetching developer information from the database.</p>
      </Card>
    );
  }

  if (!developer) {
    return (
      <Card>
        <p className="text-lg font-semibold">{profileError || "Profile not found"}</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">This developer profile does not exist yet.</p>
      </Card>
    );
  }

  const developerProjects = projects.filter((project) => project.author?.username === developer.username);
  const developerBlogs = blogs.filter((blog) => blog.author?.username === developer.username);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80">
        <img src={developer.cover} alt={developer.name} className="h-72 w-full object-cover sm:h-[26rem]" />
        <div className="px-5 pb-8 sm:px-8">
          <div className="-mt-16 flex flex-col gap-6 sm:-mt-20 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-5">
              <Avatar className="h-32 w-32 rounded-[2rem] border-4 border-zinc-900 sm:h-40 sm:w-40">
                <AvatarImage src={developer.avatar} alt={developer.name} />
                <AvatarFallback>{developer.name?.slice(0, 2) || "DC"}</AvatarFallback>
              </Avatar>
              <div className="pb-2">
                <p className="text-sm uppercase tracking-[0.26em] text-zinc-500 dark:text-white/60">Developer identity</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{developer.name}</h1>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">{developer.title}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <MapPin className="h-4 w-4" />
                  {developer.location}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">Follow</Button>
              <Button>Connect</Button>
            </div>
          </div>
          <div className="mt-8 grid gap-6 border-t border-white/8 pt-6 lg:grid-cols-[1fr_0.65fr]">
            <p className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">{developer.bio}</p>
            <div className="flex flex-wrap items-center gap-3 text-zinc-600 dark:text-zinc-400 lg:justify-end">
              {[Code2, Share2, Link2].map((Icon, index) => (
                <button
                  key={index}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:text-zinc-950 dark:hover:text-zinc-50"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-6">
          <Card>
            <h2 className="text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">Bio</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{developer.bio || profileSections.bio}</p>
          </Card>
          <Card>
            <h2 className="text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {(developer.skills?.length ? developer.skills : profileSections.skills).map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">Resume</h2>
              <Button variant="secondary" size="sm">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <h2 className="text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">GitHub stats</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {profileSections.stats.map((item) => (
                <div key={item.label} className="rounded-[1.8rem] border border-white/8 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-600 dark:text-zinc-400">{item.label}</p>
                  <p className="mt-4 text-3xl font-semibold tracking-[-0.04em]">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>
          <div>
            <h2 className="mb-4 text-3xl font-semibold tracking-[-0.03em]">Featured projects</h2>
            <div className="grid gap-5">
              {developerProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {!developerProjects.length ? (
                <Card>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">No projects published by this developer yet.</p>
                </Card>
              ) : null}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-semibold tracking-[-0.03em]">Latest blogs</h2>
            <div className="grid gap-5">
              {developerBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
              {!developerBlogs.length ? (
                <Card>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">No blogs published by this developer yet.</p>
                </Card>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;




