import { Outlet } from "react-router-dom";
import AppSidebar from "../components/sidebar/AppSidebar";
import MobileBottomNav from "../components/sidebar/MobileBottomNav";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_68%)] blur-3xl" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_65%)] blur-3xl" />
      </div>
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <AppSidebar />
        <div className="flex min-h-screen flex-1 flex-col px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-8">
          <Outlet />
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default DashboardLayout;



