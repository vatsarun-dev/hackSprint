import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blogService } from "../../services/blogService";

export const initializeBlogs = createAsyncThunk("blogs/initializeBlogs", async () => {
  return blogService.getAll();
});

export const createBlog = createAsyncThunk("blogs/createBlog", async (payload) => {
  return blogService.create(payload);
});

export const updateBlog = createAsyncThunk("blogs/updateBlog", async ({ id, payload }) => {
  return blogService.update(id, payload);
});

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id) => {
  const deleted = await blogService.delete(id);
  return deleted.databaseId || id;
});

const initialState = {
  items: [],
  isBootstrapped: false,
  loading: false,
  error: "",
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.isBootstrapped = true;
        state.error = "";
      })
      .addCase(initializeBlogs.rejected, (state, action) => {
        state.loading = false;
        state.isBootstrapped = true;
        state.error = action.error?.message || "Blogs failed to load";
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.items = state.items.map((blog) => (blog.databaseId === action.payload.databaseId ? action.payload : blog));
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.items = state.items.filter((blog) => blog.databaseId !== action.payload);
      });
  },
});

export default blogsSlice.reducer;



