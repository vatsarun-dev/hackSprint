import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="grid min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative hidden overflow-hidden border-r border-white/10 lg:block">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.96),rgba(24,24,24,0.88))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_38%)]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <div>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm backdrop-blur-xl">
              DevConnect for modern builders
            </span>
            <h1 className="mt-8 max-w-xl text-5xl font-semibold leading-tight">
              Your code, your writing, your network. One polished identity.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/80">
              Launch a portfolio, publish technical ideas, and connect with developers in a space that feels
              product-grade from day one.
            </p>
          </div>
          <div className="grid gap-4">
            {["Portfolio momentum", "Community visibility", "Blog publishing flow"].map((item, index) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-sm backdrop-blur-xl"
                style={{ transform: `translateX(${index * 18}px)` }}
              >
                <span>{item}</span>
                <span className="text-white/60">Live</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <Outlet />
      </section>
    </div>
  );
};

export default AuthLayout;



