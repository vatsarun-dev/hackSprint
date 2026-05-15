import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { projectService } from "../../services/projectService";

export const initializeProjects = createAsyncThunk("projects/initializeProjects", async () => {
  return projectService.getAll();
});

export const createProject = createAsyncThunk("projects/createProject", async (payload) => {
  return projectService.create(payload);
});

export const updateProject = createAsyncThunk("projects/updateProject", async ({ id, payload }) => {
  return projectService.update(id, payload);
});

export const deleteProject = createAsyncThunk("projects/deleteProject", async (id) => {
  const deleted = await projectService.delete(id);
  return deleted.databaseId || id;
});

const initialState = {
  items: [],
  isBootstrapped: false,
  loading: false,
  error: "",
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.isBootstrapped = true;
        state.error = "";
      })
      .addCase(initializeProjects.rejected, (state, action) => {
        state.loading = false;
        state.isBootstrapped = true;
        state.error = action.error?.message || "Projects failed to load";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.items = state.items.map((project) =>
          project.databaseId === action.payload.databaseId ? action.payload : project,
        );
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter((project) => project.databaseId !== action.payload);
      });
  },
});

export default projectsSlice.reducer;



