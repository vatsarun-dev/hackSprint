import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { useForm } from "react-hook-form";
import { createBlog } from "../../../redux/slices/blogsSlice";
import { createId, estimateReadTime, fileToDataUrl, getExcerpt, splitCommaValues } from "../../../lib/content";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";

const fallbackCover =
  "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80";

const WriteBlogPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const onSubmit = async (formValues) => {
    setSubmitting(true);
    const cover = (await fileToDataUrl(formValues.cover?.[0])) || fallbackCover;

    const blog = {
      id: createId("blog"),
      title: formValues.title,
      excerpt: getExcerpt(value, formValues.title),
      readTime: estimateReadTime(value),
      author: {
        id: user?.id || "current-user",
        username: user?.username || "you",
        name: user?.name || user?.username || "You",
        title: user?.title || "Developer",
        avatar: user?.avatar || fallbackCover,
      },
      tags: splitCommaValues(formValues.tags),
      cover,
      content: value,
    };

    dispatch(createBlog(blog));
    reset();
    setValue("");
    setSubmitting(false);
    navigate(`/blogs/${blog.id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-zinc-500 dark:text-white/60">Markdown editor</p>
        <h1 className="mt-3 text-3xl font-semibold">Write, preview, and publish technical ideas</h1>
      </div>
      <Card className="space-y-4">
        <Input placeholder="Blog title" {...register("title", { required: true })} />
        <Input placeholder="Tags" {...register("tags")} />
        <Input type="file" accept="image/*" {...register("cover")} className="pt-3" />
      </Card>
      <Card>
        <Tabs defaultValue="editor">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="editor">
            <div data-color-mode="dark">
              <MDEditor value={value} onChange={(next) => setValue(next || "")} height={420} />
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div className="rounded-[28px] border border-zinc-300 bg-zinc-50 p-5 dark:border-white/8 dark:bg-white/5">
              <MDEditor.Markdown source={value || "Start writing to preview your article."} />
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-5 flex gap-3">
          <Button onClick={handleSubmit(onSubmit)} disabled={submitting}>
            {submitting ? "Publishing..." : "Publish blog"}
          </Button>
          <Button variant="secondary" onClick={() => setValue("")}>
            Clear draft
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WriteBlogPage;




