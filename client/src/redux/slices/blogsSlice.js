import { createSlice } from "@reduxjs/toolkit";
import { blogs as seedBlogs } from "../../lib/mock-data";
import { getStoredSession, setStoredSession } from "../../lib/utils";

const STORAGE_KEY = "devconnect_blogs";

const initialState = {
  items: seedBlogs,
  isBootstrapped: false,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    initializeBlogs: (state) => {
      const stored = getStoredSession(STORAGE_KEY);
      state.items = stored?.length ? stored : seedBlogs;
      state.isBootstrapped = true;
    },
    createBlog: (state, action) => {
      state.items = [action.payload, ...state.items];
      setStoredSession(STORAGE_KEY, state.items);
    },
    updateBlog: (state, action) => {
      state.items = state.items.map((blog) => (blog.id === action.payload.id ? action.payload : blog));
      setStoredSession(STORAGE_KEY, state.items);
    },
    deleteBlog: (state, action) => {
      state.items = state.items.filter((blog) => blog.id !== action.payload);
      setStoredSession(STORAGE_KEY, state.items);
    },
  },
});

export const { initializeBlogs, createBlog, updateBlog, deleteBlog } = blogsSlice.actions;
export default blogsSlice.reducer;



