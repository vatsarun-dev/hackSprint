import { Outlet } from "react-router-dom";
import AppSidebar from "../components/sidebar/AppSidebar";
import MobileBottomNav from "../components/sidebar/MobileBottomNav";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.18),transparent_68%)] blur-3xl" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16),transparent_65%)] blur-3xl" />
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
