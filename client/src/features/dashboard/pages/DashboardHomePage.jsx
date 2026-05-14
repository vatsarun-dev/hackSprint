import { useRef } from "react";
import { useSelector } from "react-redux";
import { ArrowUpRight, CalendarRange } from "lucide-react";
import { dashboardStats, activityFeed } from "../../../lib/mock-data";
import { usePageTransition } from "../../../components/animations/pageTransition";
import StatCard from "../../../components/cards/StatCard";
import ActivityCard from "../../../components/cards/ActivityCard";
import ProjectCard from "../../../components/cards/ProjectCard";
import { Card } from "../../../components/ui/card";

const DashboardHomePage = () => {
  const pageRef = useRef(null);
  const projects = useSelector((state) => state.projects.items);
  usePageTransition(pageRef);

  return (
    <div ref={pageRef} className="space-y-10">
      <section className="grid gap-8 rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500 dark:text-white/60">Dashboard overview</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
            Your creator momentum looks strong.
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Track profile growth, content performance, and project reach from one premium command center.
          </p>
        </div>
        <div className="grid gap-4 rounded-[2rem] bg-white/5 p-5">
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <CalendarRange className="h-4 w-4 text-zinc-600 dark:text-white/70" />
            Last 30 days performance
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[84, 72, 91].map((value, index) => (
              <div key={index} className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-600 dark:text-zinc-400">S0{index + 1}</p>
                <p className="mt-3 text-2xl font-semibold">{value}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em]">Activity feed</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">LinkedIn-style visibility across your network</p>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-white/80">
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
              <h2 className="text-3xl font-semibold tracking-[-0.03em]">Weekly snapshot</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Your strongest surface right now is writing.</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-zinc-600 dark:text-white/70">
              +18% growth
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {["Blog engagement", "Project saves", "Profile discovery"].map((item, index) => (
              <div key={item}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>{item}</span>
                  <span className="text-zinc-600 dark:text-zinc-400">{76 + index * 8}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${76 + index * 8}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500 dark:text-white/60">Project spotlight</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em]">
            A curated view of the work pulling people in.
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            Your best projects should read like featured stories, not utility widgets.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardHomePage;




