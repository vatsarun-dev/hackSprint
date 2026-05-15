import { useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BlogCard from "../../../components/cards/BlogCard";
import EmptyState from "../../../components/loaders/EmptyState";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { useDebounce } from "../../../hooks/useDebounce";
import { createBlog } from "../../../redux/slices/blogsSlice";

const BlogsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs.items);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [showComposer, setShowComposer] = useState(false);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const { register, handleSubmit, reset } = useForm();

  const tags = useMemo(() => {
    const blogTags = blogs.flatMap((blog) => blog.tags || []);
    return ["All", ...new Set(blogTags)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const normalizedQuery = debouncedQuery.toLowerCase();

    return blogs.filter((blog) => {
      const searchableText = [blog.title, blog.excerpt, blog.author?.name, ...(blog.tags || [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesQuery = searchableText.includes(normalizedQuery);
      const matchesTag = activeTag === "All" || blog.tags?.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [activeTag, blogs, debouncedQuery]);

  const handleCreateBlog = async (formValues) => {
    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("title", formValues.title);
      payload.append("tags", formValues.tags || "");
      payload.append("content", content);
      if (formValues.cover?.[0]) {
        payload.append("coverImage", formValues.cover[0]);
      }

      const blog = await dispatch(createBlog(payload)).unwrap();
      reset();
      setContent("");
      setShowComposer(false);
      navigate(`${blogBasePath}/${blog.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelComposer = () => {
    reset();
    setContent("");
    setShowComposer(false);
  };

  const blogBasePath = location.pathname.startsWith("/dashboard") ? "/dashboard/blogs" : "/blogs";

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

      <Card>
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-zinc-500 dark:text-cyan-200/80">Blog CRUD</p>
          <h2 className="mt-3 text-2xl font-semibold">Manage your blogs</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Open the composer when you want to publish a new blog.
          </p>
          <Button className="mt-5" onClick={() => setShowComposer((value) => !value)}>
            {showComposer ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showComposer ? "Close form" : "New blog"}
          </Button>
        </div>
      </Card>

      {showComposer ? (
        <Card className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-zinc-500 dark:text-white/60">Markdown editor</p>
            <h2 className="mt-3 text-2xl font-semibold">Write and preview your blog</h2>
          </div>
          <form onSubmit={handleSubmit(handleCreateBlog)} className="space-y-4">
            <Input placeholder="Blog title" {...register("title", { required: true })} />
            <Input placeholder="Tags" {...register("tags")} />
            <Input type="file" accept="image/*" {...register("cover")} className="pt-3" />
            <Tabs defaultValue="editor">
              <TabsList>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="editor">
                <div data-color-mode="dark">
                  <MDEditor value={content} onChange={(next) => setContent(next || "")} height={420} />
                </div>
              </TabsContent>
              <TabsContent value="preview">
                <div className="rounded-[28px] border border-zinc-300 bg-zinc-50 p-5 dark:border-white/8 dark:bg-white/5 dark:[color-scheme:dark]">
                  <MDEditor.Markdown source={content || "Start writing to preview your article."} />
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Publishing..." : "Publish blog"}
              </Button>
              <Button type="button" variant="secondary" onClick={handleCancelComposer}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <>
          <Card className="space-y-5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600 dark:text-zinc-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="pl-11"
                placeholder="Search blogs, authors, or tags"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button key={tag} type="button" onClick={() => setActiveTag(tag)}>
                  <Badge className={activeTag === tag ? "border-zinc-950 bg-zinc-950 text-white dark:border-white/20 dark:bg-white/10 dark:text-white" : ""}>
                    {tag}
                  </Badge>
                </button>
              ))}
            </div>
          </Card>
          {filteredBlogs.length ? (
            <div className="space-y-6">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No blogs match that search"
              description="Try another author, title, or tag to discover more writing from the community."
            />
          )}
        </>
      )}
    </div>
  );
};

export default BlogsPage;




