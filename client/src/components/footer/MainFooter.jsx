import { Code2, Globe, Mail, Share2 } from "lucide-react";

const links = [
  { label: "GitHub", icon: Code2 },
  { label: "Social", icon: Share2 },
  { label: "Website", icon: Globe },
  { label: "Contact", icon: Mail },
];

const MainFooter = () => {
  return (
    <footer className="relative mt-20 border-t border-zinc-200 bg-white/90 dark:border-white/8 dark:bg-zinc-950/70">
      <div className="mx-auto grid max-w-[92rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500 dark:text-white/60">DevConnect</p>
          <p className="mt-4 max-w-xl text-3xl font-semibold leading-tight">
            Crafted for developers who want their work to feel as intentional as their code.
          </p>
          <p className="mt-4 max-w-lg text-sm text-zinc-600 dark:text-zinc-400">
            Portfolios, projects, writing, and community discovery in one immersive product surface.
          </p>
        </div>
        <div className="flex flex-col items-start gap-5 lg:items-end">
          <div className="flex items-center gap-3">
            {links.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 transition hover:-translate-y-0.5 hover:border-zinc-400 hover:text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">(c) 2026 DevConnect. Crafted with premium frontend direction.</p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;




