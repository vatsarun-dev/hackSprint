import { LayoutDashboard, LogOut, Menu, Sparkles, UserCircle2 } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { logoutUser } from "../../redux/slices/authSlice";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Explore Developers", to: "/developers" },
  { label: "Projects", to: "/projects" },
  { label: "Blogs", to: "/blogs" },
];

const MainNavbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto mt-3 flex h-20 max-w-[92rem] items-center justify-between rounded-full border border-zinc-200 bg-white/85 px-4 shadow-[0_22px_80px_rgba(2,6,23,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/80 dark:shadow-[0_22px_80px_rgba(2,6,23,0.16)] sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[1.15rem] bg-white text-black shadow-[0_12px_30px_rgba(255,255,255,0.08)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">DevConnect</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">Editorial community platform</p>
          </div>
        </Link>
        <div className="hidden items-center gap-1 rounded-full border border-zinc-200 bg-zinc-100/80 p-1.5 dark:border-white/10 dark:bg-white/5 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50",
                  isActive && "bg-white text-slate-950 shadow-sm dark:bg-white/12 dark:text-white dark:shadow-none",
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
            {isAuthenticated ? (
              <>
                <Link to={`/profile/${user?.username || "profile"}`}>
                  <Button variant="ghost">
                    <UserCircle2 className="h-4 w-4" />
                    {user?.username || "Profile"}
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="secondary">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" onClick={() => dispatch(logoutUser())}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
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



