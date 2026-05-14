export const developers = [
  {
    id: "dev-1",
    username: "aria.codes",
    name: "Aria Lennox",
    title: "Frontend Architect",
    location: "Bengaluru, India",
    followers: "18.2k",
    skills: ["React", "System Design", "GSAP"],
    bio: "Designing polished product surfaces and frontend platforms for teams that scale fast.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=320&q=80",
    cover:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "dev-2",
    username: "milesstack",
    name: "Miles Carter",
    title: "Full Stack Product Engineer",
    location: "Austin, USA",
    followers: "12.4k",
    skills: ["Node.js", "TypeScript", "GraphQL"],
    bio: "Shipping developer platforms, community products, and resilient API workflows.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80",
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "dev-3",
    username: "nina.dev",
    name: "Nina Park",
    title: "DX Engineer",
    location: "Seoul, South Korea",
    followers: "9.6k",
    skills: ["Docs", "React", "Open Source"],
    bio: "Helping teams turn internal tooling into beautiful, lovable developer experiences.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=320&q=80",
    cover:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  },
];

export const projects = [
  {
    id: "proj-1",
    title: "PulseBoard",
    description: "A cross-team engineering health dashboard with timeline analytics and release insights.",
    techStack: ["React", "Redux", "Charting"],
    likes: 430,
    author: developers[0],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    features: ["Realtime metrics", "Focus mode views", "Permission-aware widgets"],
    tags: ["Analytics", "SaaS", "Dashboard"],
    github: "https://github.com",
    live: "https://vercel.com",
  },
  {
    id: "proj-2",
    title: "RepoLens",
    description: "Repository intelligence tool for technical due diligence, onboarding, and code exploration.",
    techStack: ["Vite", "Tailwind", "Node"],
    likes: 318,
    author: developers[1],
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    features: ["Repo digest", "Ownership signals", "Dependency snapshots"],
    tags: ["Developer Tools", "Code"],
    github: "https://github.com",
    live: "https://vercel.com",
  },
  {
    id: "proj-3",
    title: "WriteFlow",
    description: "A markdown-first editor for developer educators with instant previews and distribution workflows.",
    techStack: ["React", "Markdown", "GSAP"],
    likes: 275,
    author: developers[2],
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    features: ["Live preview", "Code snippets", "Publishing templates"],
    tags: ["Writing", "Community"],
    github: "https://github.com",
    live: "https://vercel.com",
  },
];

export const blogs = [
  {
    id: "blog-1",
    title: "Designing Frontend Architecture for Fast-Moving SaaS Teams",
    excerpt: "How to keep component systems flexible while product requirements evolve weekly.",
    readTime: "7 min read",
    author: developers[0],
    tags: ["Architecture", "React"],
    cover:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80",
    content: `# Designing Frontend Architecture

When a product is evolving quickly, architecture needs to support change without turning every feature into a rewrite.

\`\`\`js
export const prioritize = (features) => features.filter((item) => item.userImpact > 8);
\`\`\`

Strong frontend systems balance:

- product velocity
- reusable primitives
- clear feature ownership
- predictable routing and state boundaries
`,
  },
  {
    id: "blog-2",
    title: "From Portfolio to Platform: Crafting a Developer Identity That Converts",
    excerpt: "A practical guide to making your public developer presence feel premium and credible.",
    readTime: "5 min read",
    author: developers[1],
    tags: ["Career", "Brand"],
    cover:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    content: `# Developer Identity

Great developer profiles show proof, not just claims.

## Include

- projects with outcomes
- technical writing
- social proof
- a consistent design language
`,
  },
];

export const dashboardStats = [
  { label: "Projects Uploaded", value: 18, trend: "+12%" },
  { label: "Blog Views", value: 28400, trend: "+24%" },
  { label: "Followers", value: 1280, trend: "+9%" },
  { label: "Profile Visits", value: 9340, trend: "+18%" },
];

export const activityFeed = [
  "Nina Park followed your profile after reading your animation workflow post.",
  "PulseBoard received 48 new likes and 6 comments this week.",
  "Your profile ranked in the top 8% for frontend architecture searches.",
];

export const profileSections = {
  bio: "Senior frontend architect focused on design systems, interaction quality, and product-led developer experiences.",
  skills: ["React", "JavaScript", "Tailwind CSS", "Redux Toolkit", "GSAP", "DX"],
  stats: [
    { label: "Contributions", value: "1,286" },
    { label: "Repositories", value: "64" },
    { label: "Streak", value: "142 days" },
    { label: "Top Language", value: "JavaScript" },
  ],
};



