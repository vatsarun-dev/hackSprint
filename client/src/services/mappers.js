import { estimateReadTime, getExcerpt } from "../lib/content";

const fallbackProjectImage =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";

const fallbackBlogCover =
  "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80";

export const unwrapApiData = (response) => response.data?.data ?? response.data;

export const mapUser = (user = {}) => ({
  ...user,
  id: user.id || user._id,
  username: user.username || user.email?.split("@")[0] || "",
  title: user.title || user.description?.title || "",
  location: user.location || user.description?.location || "",
  bio: user.bio || user.description?.summary || "",
  avatar: user.avatar || user.profilePicture || "",
  cover: user.cover || user.banner || "",
  skills: user.skills || [],
  followers: Array.isArray(user.followers) ? `${user.followers.length} followers` : user.followers || "0 followers",
  following: Array.isArray(user.following) ? user.following.length : user.following || 0,
});

export const mapProject = (project = {}) => {
  const author = typeof project.author === "object" ? mapUser(project.author) : {};

  return {
    ...project,
    id: project.id || project.slug || project._id,
    databaseId: project.databaseId || project._id,
    image: project.image || project.thumbnail || fallbackProjectImage,
    tags: project.tags?.length ? project.tags : ["Community"],
    features: project.features?.length ? project.features : [],
    techStack: project.techStack || [],
    github: project.github || project.githubUrl || "",
    live: project.live || project.liveUrl || "",
    likes: project.likes || 0,
    author: {
      id: author.id || project.author,
      username: author.username || "developer",
      name: author.name || "Developer",
      title: author.title || "Developer",
      avatar: author.avatar || fallbackProjectImage,
    },
  };
};

export const mapBlog = (blog = {}) => {
  const author = typeof blog.author === "object" ? mapUser(blog.author) : {};

  return {
    ...blog,
    id: blog.id || blog.slug || blog._id,
    databaseId: blog.databaseId || blog._id,
    cover: blog.cover || blog.coverImage || fallbackBlogCover,
    tags: blog.tags || [],
    excerpt: blog.excerpt || getExcerpt(blog.content, blog.title),
    readTime: blog.readTime || estimateReadTime(blog.content),
    author: {
      id: author.id || blog.author,
      username: author.username || "developer",
      name: author.name || "Developer",
      title: author.title || "Developer",
      avatar: author.avatar || fallbackBlogCover,
    },
  };
};
