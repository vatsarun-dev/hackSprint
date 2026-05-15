import { ArrowLeft, BookOpen, FolderKanban, Menu, UserRound } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/slices/uiSlice";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import ThemeToggle from "../navbar/ThemeToggle";

const items = [
  { icon: UserRound, label: "My Profile", to: "/profile/edit" },
  { icon: FolderKanban, label: "Projects", to: "/dashboard/projects" },
  { icon: BookOpen, label: "Blogs", to: "/dashboard/blogs" },
];

const AppSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const collapsed = useSelector((state) => state.ui.sidebarCollapsed);

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen flex-col border-r border-zinc-200 bg-white/95 px-3 py-6 shadow-[16px_0_50px_rgba(15,23,42,0.06)] backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/70 dark:shadow-none lg:flex",
        collapsed ? "w-24" : "w-72",
      )}
    >
      <div className="mb-8 flex items-center justify-between px-3">
        <div className={cn("overflow-hidden transition", collapsed && "w-0 opacity-0")}>
          <p className="text-lg font-semibold">DevConnect</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Creator dashboard</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => dispatch(toggleSidebar())}>
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {items.map(({ icon: Icon, label, to, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/8 dark:hover:text-zinc-50",
                isActive && "bg-zinc-950 text-white shadow-sm dark:bg-white/12 dark:text-white dark:shadow-none",
                collapsed && "justify-center px-0",
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </div>
      <div className="grid gap-2">
        <Button variant="secondary" className={cn("w-full justify-start px-3", collapsed && "justify-center px-0")} onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
          {!collapsed && "Back home"}
        </Button>
        <div className={cn("flex items-center gap-3 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100", collapsed && "justify-center px-0")}>
          <ThemeToggle className="h-9 w-9 px-0" />
          {!collapsed && <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Theme</span>}
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;



