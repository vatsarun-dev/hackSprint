import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { useForm } from "react-hook-form";
import { createBlog } from "../../../redux/slices/blogsSlice";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";

const WriteBlogPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (formValues) => {
    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("title", formValues.title);
      payload.append("tags", formValues.tags || "");
      payload.append("content", value);
      if (formValues.cover?.[0]) {
        payload.append("coverImage", formValues.cover[0]);
      }

      const blog = await dispatch(createBlog(payload)).unwrap();
      reset();
      setValue("");
      navigate(`/blogs/${blog.id}`);
    } finally {
      setSubmitting(false);
    }
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




