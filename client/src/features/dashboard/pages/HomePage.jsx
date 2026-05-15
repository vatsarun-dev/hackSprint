import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FolderKanban, Network, Sparkles, Star, UserCircle2 } from "lucide-react";
import { blogs as seedBlogs, developers, projects as seedProjects } from "../../../lib/mock-data";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { useHeroAnimation } from "../../../components/animations/heroAnimation";
import { useRevealAnimation } from "../../../components/animations/revealAnimation";

const featureItems = [
  {
    title: "Developer Portfolios",
    description: "Design a public identity with proof, momentum, and visual clarity instead of static resume energy.",
    icon: UserCircle2,
  },
  {
    title: "Project Showcase",
    description: "Frame your work like a product launch, with editorial depth, cinematic imagery, and technical context.",
    icon: FolderKanban,
  },
  {
    title: "Technical Blogs",
    description: "Publish writing with immersive rhythm, high-contrast readability, and story-first code presentation.",
    icon: BookOpen,
  },
  {
    title: "Community Discovery",
    description: "Move through a discovery layer that feels connected, alive, and human rather than directory-like.",
    icon: Network,
  },
];

const HomePage = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const storyRef = useRef(null);
  const projects = useSelector((state) => state.projects.items);
  const blogs = useSelector((state) => state.blogs.items);
  const previewProjects = projects.length >= 2 ? projects : [...projects, ...seedProjects].slice(0, 2);
  const previewBlogs = blogs.length >= 2 ? blogs : [...blogs, ...seedBlogs].slice(0, 2);
  useHeroAnimation(heroRef);
  useRevealAnimation(featuresRef);
  useRevealAnimation(storyRef);

  const heroStats = useMemo(
    () => [
      { label: "Active creators", value: "48k+" },
      { label: "Projects showcased", value: "9.3k" },
      { label: "Technical articles", value: "22k" },
    ],
    [],
  );

  return (
    <div className="space-y-24 pb-10">
      <section ref={heroRef} className="relative min-h-[88vh] overflow-hidden rounded-[2.5rem] px-1 pb-6 pt-4 sm:px-4 lg:px-6">
        <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_22%_14%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.05),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
        <div className="relative grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <div className="relative z-10 max-w-3xl pt-10 lg:pt-16">
            <span data-hero-copy className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-zinc-600 dark:text-zinc-400 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Developer identity, re-directed
            </span>
            <div data-hero-copy className="mt-8 max-w-2xl">
              <p className="mb-4 max-w-sm text-sm uppercase tracking-[0.35em] text-zinc-600 dark:text-zinc-400">
                Portfolio. Writing. Projects. Community.
              </p>
              <h1 className="text-[clamp(4rem,11vw,8.6rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
                Build
                <br />
                <span className="bg-gradient-to-r from-zinc-950 to-zinc-600 bg-clip-text text-transparent dark:from-white dark:to-zinc-400">Your Developer</span>
                <br />
                Identity.
              </h1>
            </div>
            <p
              data-hero-copy
              className="mt-8 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg"
            >
              A modern platform where developers create portfolios, publish technical blogs, showcase projects, and
              connect with the community.
            </p>
            <div data-hero-copy className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/signup">
                <Button className="w-full sm:w-auto">Enter DevConnect</Button>
              </Link>
              <Link to="/projects">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Explore the gallery
                </Button>
              </Link>
            </div>
            <div data-hero-copy className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="border-l border-white/10 pl-4">
                  <p className="text-3xl font-semibold sm:text-4xl">{stat.value}</p>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[38rem] lg:min-h-[50rem]">
            <div className="absolute left-[12%] top-[10%] h-28 w-28 rounded-full border border-white/10 bg-white/5 blur-[1px]" />
            <div className="absolute right-[8%] top-[6%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_68%)] blur-3xl" />

            <div className="absolute left-[2%] top-[8%] w-[56%] rounded-[2.2rem] p-[1px]">
              <Card data-hero-card className="overflow-hidden rounded-[2.2rem] p-0">
                <div className="border-b border-white/8 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">Profile presence</p>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    <img src={developers[0].avatar} alt={developers[0].name} className="h-16 w-16 rounded-[1.4rem] object-cover" />
                    <div>
                      <p className="text-lg font-semibold">{developers[0].name}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{developers[0].title}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {developers[0].skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-400">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{developers[0].bio}</p>
                </div>
              </Card>
            </div>

            <div className="absolute right-[2%] top-[18%] w-[52%] rounded-[2rem] p-[1px]">
              <Card data-hero-card className="rounded-[2rem] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">Live momentum</p>
                    <p className="mt-2 text-3xl font-semibold">28.4k</p>
                  </div>
                  <div className="rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:border-white/10 dark:bg-white/6 dark:text-white/70">
                    +18.6%
                  </div>
                </div>
                <div className="mt-6 grid gap-3">
                  {[72, 88, 54, 90, 68].map((width, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                        <span>Signal {index + 1}</span>
                        <span>{width}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-zinc-200 dark:bg-white/8">
                        <div
                          className="h-full rounded-full bg-zinc-950 dark:bg-white"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="absolute bottom-[14%] left-[16%] w-[48%] rounded-[2.2rem] p-[1px]">
              <Card data-hero-card className="rounded-[2.2rem] p-0">
                <img src={previewProjects[1].image} alt={previewProjects[1].title} className="h-52 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">Project showcase</p>
                      <p className="mt-2 text-xl font-semibold">{previewProjects[1].title}</p>
                    </div>
                    <div className="rounded-full bg-white/8 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-400">Featured</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{previewProjects[1].description}</p>
                </div>
              </Card>
            </div>

            <div className="absolute bottom-[2%] right-[8%] w-[40%] rounded-[1.8rem] p-[1px]">
              <Card data-hero-card className="rounded-[1.8rem] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">Technical writing</p>
                <p className="mt-3 text-lg font-semibold leading-snug">{previewBlogs[0].title}</p>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{previewBlogs[0].excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">{previewBlogs[0].readTime}</span>
                  <ArrowRight className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                </div>
              </Card>
            </div>

            <div className="absolute left-[48%] top-[50%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-700 backdrop-blur-xl dark:border-white/10 dark:bg-white/6 dark:text-white/80">
              <Star className="h-5 w-5" />
            </div>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="max-w-lg">
          <p data-reveal className="text-sm uppercase tracking-[0.28em] text-zinc-500 dark:text-white/60">
            Interactive features
          </p>
          <h2 data-reveal className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
            Every capability gets its own visual language.
          </h2>
          <p data-reveal className="mt-5 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Instead of repeating cards, DevConnect frames portfolios, projects, blogs, and discovery as four distinct
            product stories with their own rhythm and atmosphere.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featureItems.map(({ title, description, icon: Icon }, index) => (
            <Card
              key={title}
              data-reveal
              className={`group relative overflow-hidden p-0 ${
                index % 2 === 0 ? "md:translate-y-8" : ""
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_38%)]" />
              <div className="relative p-6 sm:p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-zinc-100 text-zinc-700 dark:bg-white/8 dark:text-white/80">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-12 text-2xl font-semibold">{title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-600 dark:text-zinc-400">{description}</p>
                <div className="mt-10 h-36 overflow-hidden rounded-[1.6rem] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4">
                  <div className="grid h-full gap-3">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-zinc-600 dark:text-zinc-400">
                      <span>Scene preview</span>
                      <span>0{index + 1}</span>
                    </div>
                    <div className="grid flex-1 grid-cols-[1.1fr_0.9fr] gap-3">
                      <div className="rounded-[1.2rem] bg-white/7" />
                      <div className="grid gap-3">
                        <div className="rounded-[1.2rem] bg-white/7" />
                        <div className="rounded-[1.2rem] bg-white/7" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section ref={storyRef} className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div>
            <p data-reveal className="text-sm uppercase tracking-[0.28em] text-zinc-500 dark:text-white/60">
              Community discovery
            </p>
            <h2 data-reveal className="mt-4 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
              A living constellation of developers, not a directory grid.
            </h2>
          </div>
          <Card data-reveal className="relative overflow-hidden p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.07),transparent_30%),radial-gradient(circle_at_78%_68%,rgba(255,255,255,0.05),transparent_28%)]" />
            <div className="relative grid gap-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">Network map</p>
                  <h3 className="mt-3 text-2xl font-semibold">Creators connected by shared craft.</h3>
                </div>
                <div className="w-fit rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-xs text-zinc-600 backdrop-blur-xl dark:border-white/10 dark:bg-white/6 dark:text-white/70">
                  28 live connections
                </div>
              </div>

              <div className="relative grid gap-4 overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-50/80 p-4 dark:border-white/10 dark:bg-white/5 sm:p-5">
                <div className="pointer-events-none absolute left-8 right-8 top-1/2 hidden h-px bg-[linear-gradient(90deg,transparent,rgba(113,113,122,0.4),transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)] md:block" />
                <div className="pointer-events-none absolute bottom-8 left-1/2 top-8 hidden w-px bg-[linear-gradient(180deg,transparent,rgba(113,113,122,0.28),transparent)] dark:bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.18),transparent)] md:block" />

                <div className="relative grid gap-4 md:grid-cols-2">
                  {developers.slice(0, 4).map((developer, index) => (
                    <Link
                      key={developer.id}
                      to={`/profile/${developer.username}`}
                      className={`group flex min-w-0 items-center gap-4 rounded-2xl border border-zinc-200 bg-white/85 p-4 text-left shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-950/60 dark:shadow-none dark:hover:border-white/20 ${
                        index === 1 ? "md:translate-y-8" : ""
                      } ${index === 2 ? "md:-translate-y-2" : ""} ${index === 3 ? "md:translate-y-6" : ""}`}
                    >
                      <img
                        src={developer.avatar}
                        alt={developer.name}
                        className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{developer.name}</p>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                          {developer.skills.join(" / ")}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card data-reveal className="overflow-hidden p-0">
            <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 sm:p-8">
                <p className="text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">Project gallery</p>
                <h3 className="mt-5 text-3xl font-semibold leading-tight">Behance energy with shipping credibility.</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  Large thumbnails, atmospheric hover depth, and layered metadata turn each project into a product story.
                </p>
                <Link to="/projects" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-white/80">
                  Browse cinematic projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative min-h-72 overflow-hidden border-l border-white/8">
                <img src={previewProjects[0].image} alt={previewProjects[0].title} className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(7,11,20,0.92))] p-6">
                  <p className="text-2xl font-semibold">{previewProjects[0].title}</p>
                  <p className="mt-2 text-sm text-slate-300">{previewProjects[0].tags.join(" / ")}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card data-reveal className="grid gap-5 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-zinc-500 dark:text-white/60">Editorial publishing</p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight">Reading experiences shaped like modern magazines.</h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-400">
                {previewBlogs[1].readTime}
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-xl font-medium leading-snug">{previewBlogs[1].title}</p>
                <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{previewBlogs[1].excerpt}</p>
              </div>
              <div className="rounded-[1.8rem] border border-white/8 bg-white/5 p-5">
                <div className="space-y-3 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                  <p>const identity = createPortfolio({`{`}</p>
                  <p className="pl-4">writing: true,</p>
                  <p className="pl-4">projects: visible,</p>
                  <p className="pl-4">community: connected,</p>
                  <p>{`}`});</p>
                </div>
              </div>
            </div>
            <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-white/80">
              Enter the editorial feed
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </div>
      </section>

      <section className="rounded-[2.8rem] border border-zinc-200 bg-white px-6 py-12 shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(0,0,0,0.98),rgba(18,18,18,0.92))] dark:shadow-none sm:px-8 sm:py-16 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500 dark:text-white/60">Final invitation</p>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
              Designed for developers who care how their work feels.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-[0.8fr_1.2fr] sm:items-end">
            <p className="max-w-lg text-base leading-7 text-zinc-600 dark:text-slate-300">
              DevConnect turns public developer presence into an immersive product surface with the polish of a modern
              launch site and the credibility of a professional engineering platform.
            </p>
            <div className="flex flex-col gap-4 sm:items-start">
              <Link to="/signup">
                <Button>Start building your identity</Button>
              </Link>
              <Link to="/developers" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-white/80">
                Explore the community
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;



