import { Outlet } from "react-router-dom";
import MainNavbar from "../components/navbar/MainNavbar";
import MainFooter from "../components/footer/MainFooter";

const MainLayout = () => {
  return (
    <div className="min-h-screen overflow-x-clip bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[12%] top-[-8rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_66%)] blur-3xl" />
        <div className="absolute right-[-6rem] top-[24rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_62%)] blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:120px_120px]" />
      </div>
      <MainNavbar />
      <main className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-[92rem] px-4 pb-20 pt-28 sm:px-6 lg:px-10">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
};

export default MainLayout;



