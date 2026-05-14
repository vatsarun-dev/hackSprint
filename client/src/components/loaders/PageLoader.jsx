const PageLoader = ({ label = "Loading DevConnect" }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="flex w-full max-w-sm flex-col items-center rounded-[32px] px-8 py-10 text-center">
        <div className="h-14 w-14 animate-spin rounded-full border-2 border-white/10 border-t-white" />
        <p className="mt-6 text-lg font-medium">{label}</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">We are preparing your premium developer workspace.</p>
      </div>
    </div>
  );
};

export default PageLoader;



