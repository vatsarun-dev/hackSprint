import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { MessageCircle, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { deleteBlog, updateBlog } from "../../../redux/slices/blogsSlice";
import { estimateReadTime, fileToDataUrl, getExcerpt, splitCommaValues } from "../../../lib/content";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.items);
  const user = useSelector((state) => state.auth.user);
  const blog = useMemo(() => blogs.find((item) => item.id === id), [blogs, id]);
  const [isEditing, setIsEditing] = useState(searchParams.get("edit") === "1");
  const [content, setContent] = useState("");
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (blog) {
      reset({
        title: blog.title,
        tags: blog.tags.join(", "),
      });
    }
  }, [blog, reset]);

  if (!blog) {
    return (
      <Card className="">
        <p className="text-lg font-semibold">Blog not found</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">This article may have been removed.</p>
      </Card>
    );
  }

  const canManage = user?.username && blog.author?.username === user.username;

  const onUpdate = async (values) => {
    const nextCover = (await fileToDataUrl(values.cover?.[0])) || blog.cover;
    dispatch(
      updateBlog({
        ...blog,
        title: values.title,
        tags: splitCommaValues(values.tags),
        content: content || blog.content,
        cover: nextCover,
        excerpt: getExcerpt(content || blog.content, values.title),
        readTime: estimateReadTime(content || blog.content),
      }),
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blog.id));
    navigate(location.pathname.startsWith("/dashboard") ? "/dashboard/blogs" : "/blogs");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <img src={blog.cover} alt={blog.title} className="h-80 w-full rounded-[2.8rem] object-cover sm:h-[28rem]" />
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500 dark:text-white/60">{blog.readTime}</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-6xl">{blog.title}</h1>
        </div>
        <div className="lg:pt-12">
          <p className="text-sm uppercase tracking-[0.22em] text-zinc-600 dark:text-zinc-400">Written by</p>
          <p className="mt-3 text-lg text-zinc-950 dark:text-zinc-50">{blog.author.name}</p>
        </div>
      </div>

      {canManage && (
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              setContent(blog.content);
              setIsEditing((value) => !value);
            }}
          >
            <Pencil className="h-4 w-4" />
            {isEditing ? "Cancel edit" : "Edit blog"}
          </Button>
          <Button variant="ghost" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      )}

      {isEditing ? (
        <Card className="space-y-4">
          <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
            <Input placeholder="Blog title" {...register("title")} />
            <Input placeholder="Tags" {...register("tags")} />
            <Input type="file" accept="image/*" {...register("cover")} className="pt-3" />
            <div data-color-mode="dark">
              <MDEditor value={content} onChange={(next) => setContent(next || "")} height={360} />
            </div>
            <Button type="submit">Save changes</Button>
          </form>
        </Card>
      ) : null}

      <Card className="prose max-w-none px-6 py-8 dark:prose-invert sm:px-10">
        <div>
          <MDEditor.Markdown source={blog.content} />
        </div>
      </Card>
      <Card className="">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-5 w-5 text-zinc-600 dark:text-white/70" />
          <h2 className="text-xl font-semibold">Comments</h2>
        </div>
        <div className="mt-4 space-y-4">
          {["Excellent balance of UX and architecture thinking.", "Would love a deeper section on route ownership."].map((comment) => (
            <div key={comment} className="rounded-3xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-white/8 dark:bg-white/5 dark:text-zinc-400">
              {comment}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BlogDetailsPage;




