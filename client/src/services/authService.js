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
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
    };
  },
  async signup(payload) {
    await delay(1100);
    return {
      id: "user-2",
      username: payload.username,
      email: payload.email,
      name: payload.username,
      title: "Product-minded Developer",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
    };
  },
};
