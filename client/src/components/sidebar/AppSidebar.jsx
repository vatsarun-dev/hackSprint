import { BarChart3, BookOpen, FolderKanban, LayoutDashboard, LogOut, Menu, Settings, UserRound } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/slices/uiSlice";
import { logoutUser } from "../../redux/slices/authSlice";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

const items = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
  { icon: UserRound, label: "My Profile", to: "/profile/edit" },
  { icon: FolderKanban, label: "Projects", to: "/projects/create" },
  { icon: BookOpen, label: "Blogs", to: "/blogs/write" },
  { icon: BarChart3, label: "Community", to: "/developers" },
  { icon: Settings, label: "Settings", to: "/settings" },
];

const AppSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const collapsed = useSelector((state) => state.ui.sidebarCollapsed);

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen flex-col border-r border-white/10 bg-white/4 px-3 py-6 backdrop-blur-2xl lg:flex",
        collapsed ? "w-24" : "w-72",
      )}
    >
      <div className="mb-8 flex items-center justify-between px-3">
        <div className={cn("overflow-hidden transition", collapsed && "w-0 opacity-0")}>
          <p className="text-lg font-semibold">DevConnect</p>
          <p className="text-sm text-[var(--muted-foreground)]">Creator dashboard</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => dispatch(toggleSidebar())}>
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {items.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-[var(--muted-foreground)] transition hover:bg-white/8 hover:text-[var(--foreground)]",
                isActive && "bg-white text-slate-950 dark:bg-white/12 dark:text-white",
                collapsed && "justify-center px-0",
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </div>
      <Button
        variant="secondary"
        className="w-full justify-start"
        onClick={() => {
          dispatch(logoutUser());
          navigate("/");
        }}
      >
        <LogOut className="h-4 w-4" />
        {!collapsed && "Logout"}
      </Button>
    </aside>
  );
};

export default AppSidebar;
