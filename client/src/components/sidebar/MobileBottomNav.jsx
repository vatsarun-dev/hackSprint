import { ArrowLeft, BookOpen, FolderKanban, LogOut, MoonStar, SunMedium, UserRound } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../lib/utils";

const items = [
  { to: "/profile/edit", icon: UserRound, label: "Profile" },
  { to: "/dashboard/projects", icon: FolderKanban, label: "Projects" },
  { to: "/dashboard/blogs", icon: BookOpen, label: "Blogs" },
];

const MobileBottomNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const ThemeIcon = theme === "dark" ? SunMedium : MoonStar;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-4 lg:hidden">
      <div className="mx-auto grid max-w-xl grid-cols-6 rounded-[28px] border border-zinc-200 bg-white/95 p-2 shadow-[0_24px_70px_rgba(15,23,42,0.22)] backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-900/90">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex flex-col items-center gap-1 rounded-2xl px-1 py-3 text-[10px] font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-[10px] font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/8",
                isActive && "bg-zinc-950 text-white dark:bg-white/12 dark:text-white",
              )
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          onClick={toggle}
          className="flex flex-col items-center gap-1 rounded-2xl px-1 py-3 text-[10px] font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/8"
        >
          <ThemeIcon className="h-4 w-4" />
          <span>Theme</span>
        </button>
        <button
          type="button"
          onClick={() => {
            dispatch(logoutUser());
            navigate("/");
          }}
          className="flex flex-col items-center gap-1 rounded-2xl px-1 py-3 text-[10px] font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/8"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;



