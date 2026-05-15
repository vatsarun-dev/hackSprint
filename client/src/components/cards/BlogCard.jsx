import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

const BlogCard = ({ blog }) => {
  const location = useLocation();
  const blogBasePath = location.pathname.startsWith("/dashboard") ? "/dashboard/blogs" : "/blogs";

  return (
    <Link to={`${blogBasePath}/${blog.id}`}>
      <Card className="group h-full overflow-hidden p-0 transition duration-500 hover:-translate-y-1">
        <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden">
            <img src={blog.cover} alt={blog.title} className="h-full min-h-60 w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-400">
              <span>{blog.author.name}</span>
              <span>/</span>
              <span>{blog.readTime}</span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold leading-tight">{blog.title}</h3>
            <p className="mt-4 text-sm leading-7 text-zinc-700 dark:text-zinc-400">{blog.excerpt}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-white/80">
              Read article
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;



