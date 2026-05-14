import { useMemo } from "react";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { MessageCircle } from "lucide-react";
import { blogs } from "../../../lib/mock-data";
import { Card } from "../../../components/ui/card";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const blog = useMemo(() => blogs.find((item) => item.id === id) || blogs[0], [id]);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <img src={blog.cover} alt={blog.title} className="h-72 w-full rounded-[36px] object-cover sm:h-96" />
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.22em] text-indigo-300">{blog.readTime}</p>
        <h1 className="text-4xl font-semibold">{blog.title}</h1>
        <p className="text-[var(--muted-foreground)]">By {blog.author.name}</p>
      </div>
      <Card className="prose prose-invert max-w-none dark:prose-invert">
        <div data-color-mode="dark">
          <MDEditor.Markdown source={blog.content} />
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-3">
          <MessageCircle className="h-5 w-5 text-indigo-300" />
          <h2 className="text-xl font-semibold">Comments</h2>
        </div>
        <div className="mt-4 space-y-4">
          {["Excellent balance of UX and architecture thinking.", "Would love a deeper section on route ownership."].map((comment) => (
            <div key={comment} className="rounded-3xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-[var(--muted-foreground)]">
              {comment}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BlogDetailsPage;
