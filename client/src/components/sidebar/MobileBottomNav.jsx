import { BookOpen, FolderKanban, Home, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";

const items = [
  { to: "/dashboard/home", icon: Home, label: "Home" },
  { to: "/dashboard/community", icon: Search, label: "Community" },
  { to: "/dashboard/projects", icon: FolderKanban, label: "Projects" },
  { to: "/blogs/write", icon: BookOpen, label: "Write" },
];

const MobileBottomNav = () => {
  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-4 lg:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-4 rounded-[28px] border border-white/10 bg-white/90 p-2 shadow-[0_24px_70px_rgba(15,23,42,0.28)] backdrop-blur-2xl dark:bg-zinc-900/90">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-[10px] text-zinc-600 dark:text-zinc-400 transition",
                isActive && "bg-white text-slate-950 dark:bg-white/12 dark:text-white",
              )
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;



