import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { deleteBlog, updateBlog } from "../../../redux/slices/blogsSlice";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const blogs = useSelector((state) => state.blogs.items);
  const currentUser = useSelector((state) => state.auth.user);
  const blog = useMemo(() => blogs.find((item) => item.id === id), [blogs, id]);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm();

  if (!blog) {
    return (
      <Card className="">
        <p className="text-lg font-semibold">Blog not found</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          This article may have been removed.
        </p>
      </Card>
    );
  }

  const blogBasePath = location.pathname.startsWith("/dashboard")
    ? "/dashboard/blogs"
    : "/blogs";
  const mutationId = blog.databaseId || blog.id;
  const isOwner =
    currentUser?.id && blog.author?.id && currentUser.id === blog.author.id;

  const openEditor = () => {
    reset({
      title: blog.title || "",
      tags: (blog.tags || []).join(", "),
    });
    setContent(blog.content || "");
    setError("");
    setIsEditing(true);
  };

  const closeEditor = () => {
    setIsEditing(false);
    setContent("");
    setError("");
    reset();
  };

  const handleUpdateBlog = async (formValues) => {
    setSubmitting(true);
    setError("");
    try {
      const payload = new FormData();
      payload.append("title", formValues.title);
      payload.append("tags", formValues.tags || "");
      payload.append("content", content);
      if (formValues.cover?.[0]) {
        payload.append("coverImage", formValues.cover[0]);
      }

      const updatedBlog = await dispatch(
        updateBlog({ id: mutationId, payload }),
      ).unwrap();
      closeEditor();
      navigate(`${blogBasePath}/${updatedBlog.id}`);
    } catch (updateError) {
      setError(updateError?.message || "Blog update failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBlog = async () => {
    const confirmed = window.confirm("Delete this blog permanently?");
    if (!confirmed) {
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await dispatch(deleteBlog(mutationId)).unwrap();
      navigate(blogBasePath);
    } catch (deleteError) {
      setError(deleteError?.message || "Blog delete failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <img
        src={blog.cover}
        alt={blog.title}
        className="h-80 w-full rounded-[2.8rem] object-cover sm:h-[28rem]"
      />
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500 dark:text-white/60">
            {blog.readTime}
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-6xl">
            {blog.title}
          </h1>
        </div>
        <div className="lg:pt-12">
          <p className="text-sm uppercase tracking-[0.22em] text-zinc-600 dark:text-zinc-400">
            Written by
          </p>
          <p className="mt-3 text-lg text-zinc-950 dark:text-zinc-50">
            {blog.author.name}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {(blog.tags || []).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>

      {isOwner ? (
        <Card className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-zinc-500 dark:text-white/60">
                Blog controls
              </p>
              {/* <h2 className="mt-2 text-2xl font-semibold">Update or delete this post</h2> */}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={isEditing ? closeEditor : openEditor}
              >
                {isEditing ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Pencil className="h-4 w-4" />
                )}
                {isEditing ? "Cancel" : "Edit"}
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={handleDeleteBlog}
                disabled={submitting}
              >
                <Trash2 className="h-4 w-4" />
                {submitting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>

          {error ? (
            <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
          ) : null}

          {isEditing ? (
            <form
              onSubmit={handleSubmit(handleUpdateBlog)}
              className="space-y-4"
            >
              <Input
                placeholder="Blog title"
                {...register("title", { required: true })}
              />
              <Input placeholder="Tags" {...register("tags")} />
              <Input
                type="file"
                accept="image/*"
                {...register("cover")}
                className="pt-3"
              />
              <Tabs defaultValue="editor">
                <TabsList>
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="editor">
                  <div data-color-mode="dark">
                    <MDEditor
                      value={content}
                      onChange={(next) => setContent(next || "")}
                      height={420}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="preview">
                  <div className="rounded-[28px] border border-zinc-300 bg-zinc-50 p-5 dark:border-white/8 dark:bg-white/5 dark:[color-scheme:dark]">
                    <MDEditor.Markdown
                      source={
                        content || "Start writing to preview your article."
                      }
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <Button type="submit" disabled={submitting}>
                <Save className="h-4 w-4" />
                {submitting ? "Saving..." : "Save changes"}
              </Button>
            </form>
          ) : null}
        </Card>
      ) : null}

      <Card className="prose max-w-none px-6 py-8 dark:prose-invert sm:px-10">
        <div>
          <MDEditor.Markdown source={blog.content} />
        </div>
      </Card>
      {/* <Card className="">
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
      </Card> */}
    </div>
  );
};

export default BlogDetailsPage;
