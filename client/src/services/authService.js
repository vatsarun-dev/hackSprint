const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login(payload) {
    await delay(900);
    return {
      id: "user-1",
      username: payload.email?.split("@")[0] || "devbuilder",
      email: payload.email,
      name: "Aria Lennox",
      title: "Senior Frontend Engineer",
      location: "Bengaluru, India",
      bio: "I build focused React products with clean interfaces and practical frontend systems.",
      skills: ["React", "Tailwind CSS", "Redux Toolkit"],
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
      cover:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    };
  },
  async signup(payload) {
    await delay(1100);
    return {
      id: "user-2",
      username: payload.username,
      email: payload.email,
      name: payload.name || payload.username,
      title: "Product-minded Developer",
      location: "India",
      bio: "I am shaping my developer profile and collecting my best projects in one place.",
      skills: ["React", "JavaScript", "Tailwind CSS"],
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
      cover:
        "https://images.unsplash.com/photo-1498050108023-c524f4df085?auto=format&fit=crop&w=1200&q=80",
    };
  },
};



