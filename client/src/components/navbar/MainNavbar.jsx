import { Menu, Sparkles } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Explore Developers", to: "/developers" },
  { label: "Projects", to: "/projects" },
  { label: "Blogs", to: "/blogs" },
];

const MainNavbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto mt-3 flex h-20 max-w-[92rem] items-center justify-between rounded-full border border-white/10 bg-[color:var(--background)]/58 px-4 shadow-[0_22px_80px_rgba(2,6,23,0.16)] backdrop-blur-2xl sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[1.15rem] bg-[linear-gradient(135deg,#6057ff,#83b7ff)] text-white shadow-[0_12px_30px_rgba(79,70,229,0.38)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">DevConnect</p>
            <p className="text-xs text-[var(--muted-foreground)]">Editorial community platform</p>
          </div>
        </Link>
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]",
                  isActive && "bg-white text-slate-950 dark:bg-white/12 dark:text-white",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 sm:flex">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
          <Button variant="secondary" size="sm" className="sm:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default MainNavbar;
