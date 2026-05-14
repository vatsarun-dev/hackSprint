import { blogs } from "../../../lib/mock-data";
import BlogCard from "../../../components/cards/BlogCard";

const BlogsPage = () => {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(139,92,246,0.14),rgba(59,130,246,0.05))] p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.22em] text-indigo-300">Blog feed</p>
        <h1 className="mt-3 text-4xl font-semibold">Read thoughtful technical writing from the community</h1>
        <p className="mt-4 max-w-2xl text-[var(--muted-foreground)]">
          Medium-style reading flow, clean markdown support, and story-first presentation for technical insight.
        </p>
      </section>
      <div className="grid gap-5 lg:grid-cols-2">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
