const PageLoader = ({ label = "Loading DevConnect" }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
      <div className="glass-panel flex w-full max-w-sm flex-col items-center rounded-[32px] px-8 py-10 text-center">
        <div className="h-14 w-14 animate-spin rounded-full border-2 border-white/10 border-t-indigo-400" />
        <p className="mt-6 text-lg font-medium">{label}</p>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">We are preparing your premium developer workspace.</p>
      </div>
    </div>
  );
};

export default PageLoader;
