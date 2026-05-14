import { useSelector } from "react-redux";
import BlogCard from "../../../components/cards/BlogCard";

const BlogsPage = () => {
  const blogs = useSelector((state) => state.blogs.items);
  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500 dark:text-white/60">Blog feed</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl">
            Read thoughtful technical writing from the community.
          </h1>
        </div>
        <p className="max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 lg:ml-auto">
          Spacious reading flow, clean markdown support, and a quieter editorial rhythm that keeps the writing in front.
        </p>
      </section>
      <div className="space-y-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;




