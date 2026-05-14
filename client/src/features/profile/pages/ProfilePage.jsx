import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Code2, Download, Link2, MapPin, Share2 } from "lucide-react";
import { developers, blogs, projects, profileSections } from "../../../lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import ProjectCard from "../../../components/cards/ProjectCard";
import BlogCard from "../../../components/cards/BlogCard";

const ProfilePage = () => {
  const { username } = useParams();

  const developer = useMemo(
    () => developers.find((item) => item.username === username) || developers[0],
    [username],
  );

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[36px] border border-white/10 bg-[color:var(--card)]">
        <img src={developer.cover} alt={developer.name} className="h-60 w-full object-cover sm:h-72" />
        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-14 flex flex-col gap-6 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-5">
              <Avatar className="h-28 w-28 rounded-[30px] border-4 border-[var(--card)] sm:h-32 sm:w-32">
                <AvatarImage src={developer.avatar} alt={developer.name} />
                <AvatarFallback>{developer.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="pb-2">
                <h1 className="text-3xl font-semibold">{developer.name}</h1>
                <p className="mt-1 text-[var(--muted-foreground)]">{developer.title}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
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
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[var(--muted-foreground)]">
            {[Code2, Share2, Link2].map((Icon, index) => (
              <button
                key={index}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:text-[var(--foreground)]"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold">Bio</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">{profileSections.bio}</p>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {profileSections.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Resume</h2>
              <Button variant="secondary" size="sm">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold">GitHub stats</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {profileSections.stats.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/8 bg-white/5 p-4">
                  <p className="text-sm text-[var(--muted-foreground)]">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Featured projects</h2>
            <div className="grid gap-5">
              {projects.slice(0, 2).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Latest blogs</h2>
            <div className="grid gap-5">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
