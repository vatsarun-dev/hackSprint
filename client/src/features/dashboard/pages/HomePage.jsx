import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FolderKanban, Network, Sparkles, Star, UserCircle2 } from "lucide-react";
import { developers, projects, blogs } from "../../../lib/mock-data";
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
        <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_22%_14%,rgba(116,104,255,0.18),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(73,153,255,0.16),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
        <div className="relative grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <div className="relative z-10 max-w-3xl pt-10 lg:pt-16">
            <span data-hero-copy className="editorial-kicker">
              <Sparkles className="h-3.5 w-3.5" />
              Developer identity, re-directed
            </span>
            <div data-hero-copy className="mt-8 max-w-2xl">
              <p className="mb-4 max-w-sm text-sm uppercase tracking-[0.35em] text-[var(--muted-foreground)]">
                Portfolio. Writing. Projects. Community.
              </p>
              <h1 className="text-[clamp(4rem,11vw,8.6rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
                Build
                <br />
                <span className="spotlight-text">Your Developer</span>
                <br />
                Identity.
              </h1>
            </div>
            <p
              data-hero-copy
              className="mt-8 max-w-xl text-base leading-7 text-[var(--muted-foreground)] sm:text-lg"
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
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[38rem] lg:min-h-[50rem]">
            <div className="absolute left-[12%] top-[10%] h-28 w-28 rounded-full border border-white/10 bg-white/5 blur-[1px]" />
            <div className="absolute right-[8%] top-[6%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.24),transparent_68%)] blur-3xl" />

            <div className="editorial-frame absolute left-[2%] top-[8%] w-[56%] rounded-[2.2rem] p-[1px]">
              <Card data-hero-card className="float-slow overflow-hidden rounded-[2.2rem] p-0">
                <div className="border-b border-white/8 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-indigo-300">Profile presence</p>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    <img src={developers[0].avatar} alt={developers[0].name} className="h-16 w-16 rounded-[1.4rem] object-cover" />
                    <div>
                      <p className="text-lg font-semibold">{developers[0].name}</p>
                      <p className="text-sm text-[var(--muted-foreground)]">{developers[0].title}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {developers[0].skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted-foreground)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 text-sm leading-6 text-[var(--muted-foreground)]">{developers[0].bio}</p>
                </div>
              </Card>
            </div>

            <div className="editorial-frame absolute right-[2%] top-[18%] w-[52%] rounded-[2rem] p-[1px]">
              <Card data-hero-card className="float-delayed rounded-[2rem] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-sky-300">Live momentum</p>
                    <p className="mt-2 text-3xl font-semibold">28.4k</p>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                    +18.6%
                  </div>
                </div>
                <div className="mt-6 grid gap-3">
                  {[72, 88, 54, 90, 68].map((width, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                        <span>Signal {index + 1}</span>
                        <span>{width}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(135deg,#7c6cff,#59b6ff)]"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="editorial-frame absolute bottom-[14%] left-[16%] w-[48%] rounded-[2.2rem] p-[1px]">
              <Card data-hero-card className="float-delayed rounded-[2.2rem] p-0">
                <img src={projects[1].image} alt={projects[1].title} className="h-52 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-indigo-300">Project showcase</p>
                      <p className="mt-2 text-xl font-semibold">{projects[1].title}</p>
                    </div>
                    <div className="rounded-full bg-white/8 px-3 py-1 text-xs text-[var(--muted-foreground)]">Featured</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{projects[1].description}</p>
                </div>
              </Card>
            </div>

            <div className="editorial-frame absolute bottom-[2%] right-[8%] w-[40%] rounded-[1.8rem] p-[1px]">
              <Card data-hero-card className="rounded-[1.8rem] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-indigo-300">Technical writing</p>
                <p className="mt-3 text-lg font-semibold leading-snug">{blogs[0].title}</p>
                <p className="mt-3 text-sm text-[var(--muted-foreground)]">{blogs[0].excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">{blogs[0].readTime}</span>
                  <ArrowRight className="h-4 w-4 text-[var(--muted-foreground)]" />
                </div>
              </Card>
            </div>

            <div className="absolute left-[48%] top-[50%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/6 text-indigo-300 backdrop-blur-xl">
              <Star className="h-5 w-5" />
            </div>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="max-w-lg">
          <p data-reveal className="text-sm uppercase tracking-[0.28em] text-indigo-300">
            Interactive features
          </p>
          <h2 data-reveal className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
            Every capability gets its own visual language.
          </h2>
          <p data-reveal className="mt-5 text-base leading-7 text-[var(--muted-foreground)]">
            Instead of repeating cards, DevConnect frames portfolios, projects, blogs, and discovery as four distinct
            product stories with their own rhythm and atmosphere.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featureItems.map(({ title, description, icon: Icon }, index) => (
            <Card
              key={title}
              data-reveal
              className={`editorial-frame group relative overflow-hidden p-0 ${
                index % 2 === 0 ? "md:translate-y-8" : ""
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,108,255,0.18),transparent_38%)]" />
              <div className="relative p-6 sm:p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-white/8 text-indigo-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-12 text-2xl font-semibold">{title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--muted-foreground)]">{description}</p>
                <div className="mt-10 h-36 overflow-hidden rounded-[1.6rem] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4">
                  <div className="grid h-full gap-3">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
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
            <p data-reveal className="text-sm uppercase tracking-[0.28em] text-indigo-300">
              Community discovery
            </p>
            <h2 data-reveal className="mt-4 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
              A living constellation of developers, not a directory grid.
            </h2>
          </div>
          <Card data-reveal className="editorial-frame relative min-h-[34rem] overflow-hidden p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(123,97,255,0.16),transparent_28%),radial-gradient(circle_at_80%_50%,rgba(80,157,255,0.12),transparent_25%)]" />
            <div className="relative h-full">
              <div className="absolute left-[8%] top-[12%] flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-3 backdrop-blur-xl">
                <img src={developers[0].avatar} alt={developers[0].name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium">{developers[0].name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{developers[0].skills.join(" / ")}</p>
                </div>
              </div>
              <div className="absolute right-[10%] top-[28%] flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-3 backdrop-blur-xl">
                <img src={developers[1].avatar} alt={developers[1].name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium">{developers[1].name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{developers[1].skills.join(" / ")}</p>
                </div>
              </div>
              <div className="absolute bottom-[12%] left-[18%] flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-3 backdrop-blur-xl">
                <img src={developers[2].avatar} alt={developers[2].name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium">{developers[2].name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{developers[2].skills.join(" / ")}</p>
                </div>
              </div>
              <div className="absolute left-[27%] top-[29%] h-px w-[42%] bg-[linear-gradient(90deg,transparent,rgba(165,180,252,0.5),transparent)]" />
              <div className="absolute left-[32%] top-[48%] h-px w-[36%] rotate-[28deg] bg-[linear-gradient(90deg,transparent,rgba(125,211,252,0.35),transparent)]" />
              <div className="absolute left-[39%] top-[34%] rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                28 live connections
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card data-reveal className="editorial-frame overflow-hidden p-0">
            <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 sm:p-8">
                <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Project gallery</p>
                <h3 className="mt-5 text-3xl font-semibold leading-tight">Behance energy with shipping credibility.</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
                  Large thumbnails, atmospheric hover depth, and layered metadata turn each project into a product story.
                </p>
                <Link to="/projects" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-indigo-300">
                  Browse cinematic projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative min-h-72 overflow-hidden border-l border-white/8">
                <img src={projects[0].image} alt={projects[0].title} className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(7,11,20,0.92))] p-6">
                  <p className="text-2xl font-semibold">{projects[0].title}</p>
                  <p className="mt-2 text-sm text-slate-300">{projects[0].tags.join(" / ")}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card data-reveal className="editorial-frame grid gap-5 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-indigo-300">Editorial publishing</p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight">Reading experiences shaped like modern magazines.</h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-[var(--muted-foreground)]">
                {blogs[1].readTime}
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-xl font-medium leading-snug">{blogs[1].title}</p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">{blogs[1].excerpt}</p>
              </div>
              <div className="rounded-[1.8rem] border border-white/8 bg-white/5 p-5">
                <div className="space-y-3 font-mono text-xs text-[var(--muted-foreground)]">
                  <p>const identity = createPortfolio({`{`}</p>
                  <p className="pl-4">writing: true,</p>
                  <p className="pl-4">projects: visible,</p>
                  <p className="pl-4">community: connected,</p>
                  <p>{`}`});</p>
                </div>
              </div>
            </div>
            <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-300">
              Enter the editorial feed
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </div>
      </section>

      <section className="rounded-[2.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,20,36,0.94),rgba(9,14,25,0.88))] px-6 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-indigo-300">Final invitation</p>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
              Designed for developers who care how their work feels.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-[0.8fr_1.2fr] sm:items-end">
            <p className="max-w-lg text-base leading-7 text-slate-300">
              DevConnect turns public developer presence into an immersive product surface with the polish of a modern
              launch site and the credibility of a professional engineering platform.
            </p>
            <div className="flex flex-col gap-4 sm:items-start">
              <Link to="/signup">
                <Button>Start building your identity</Button>
              </Link>
              <Link to="/developers" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-300">
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
