import { Code2, Globe, Mail, Share2 } from "lucide-react";

const links = [
  { label: "GitHub", icon: Code2 },
  { label: "Social", icon: Share2 },
  { label: "Website", icon: Globe },
  { label: "Contact", icon: Mail },
];

const MainFooter = () => {
  return (
    <footer className="relative mt-20 border-t border-white/8 bg-[color:var(--background)]/70">
      <div className="mx-auto grid max-w-[92rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-indigo-300">DevConnect</p>
          <p className="mt-4 max-w-xl text-3xl font-semibold leading-tight">
            Crafted for developers who want their work to feel as intentional as their code.
          </p>
          <p className="mt-4 max-w-lg text-sm text-[var(--muted-foreground)]">
            Portfolios, projects, writing, and community discovery in one immersive product surface.
          </p>
        </div>
        <div className="flex flex-col items-start gap-5 lg:items-end">
          <div className="flex items-center gap-3">
            {links.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--muted-foreground)] transition hover:-translate-y-0.5 hover:text-[var(--foreground)]"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">© 2026 DevConnect. Crafted with premium frontend direction.</p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
