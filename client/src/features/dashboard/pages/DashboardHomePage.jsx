import { useRef } from "react";
import { ArrowUpRight, CalendarRange } from "lucide-react";
import { dashboardStats, activityFeed, projects } from "../../../lib/mock-data";
import { usePageTransition } from "../../../components/animations/pageTransition";
import StatCard from "../../../components/cards/StatCard";
import ActivityCard from "../../../components/cards/ActivityCard";
import ProjectCard from "../../../components/cards/ProjectCard";
import { Card } from "../../../components/ui/card";

const DashboardHomePage = () => {
  const pageRef = useRef(null);
  usePageTransition(pageRef);

  return (
    <div ref={pageRef} className="space-y-8">
      <section className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(139,92,246,0.16),rgba(59,130,246,0.06))] p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-indigo-300">Dashboard overview</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Your creator momentum looks strong.</h1>
          <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
            Track profile growth, content performance, and project reach from one premium command center.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--muted-foreground)]">
          <CalendarRange className="h-4 w-4 text-indigo-300" />
          Last 30 days performance
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Activity feed</h2>
              <p className="text-sm text-[var(--muted-foreground)]">LinkedIn-style visibility across your network</p>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-medium text-indigo-300">
              Open analytics
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          {activityFeed.map((item, index) => (
            <ActivityCard key={item} activity={item} index={index} />
          ))}
        </div>
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Weekly snapshot</h2>
              <p className="text-sm text-[var(--muted-foreground)]">Your strongest surface right now is writing.</p>
            </div>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              +18% growth
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {["Blog engagement", "Project saves", "Profile discovery"].map((item, index) => (
              <div key={item}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>{item}</span>
                  <span className="text-[var(--muted-foreground)]">{76 + index * 8}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(135deg,#8b5cf6,#3b82f6)]"
                    style={{ width: `${76 + index * 8}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold">Project spotlight</h2>
          <p className="text-sm text-[var(--muted-foreground)]">Quick access to your most visible work</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardHomePage;
