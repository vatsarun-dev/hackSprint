import { createSlice } from "@reduxjs/toolkit";
import { projects as seedProjects } from "../../lib/mock-data";
import { getStoredSession, setStoredSession } from "../../lib/utils";

const STORAGE_KEY = "devconnect_projects";

const initialState = {
  items: seedProjects,
  isBootstrapped: false,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    initializeProjects: (state) => {
      const stored = getStoredSession(STORAGE_KEY);
      state.items = stored?.length ? stored : seedProjects;
      state.isBootstrapped = true;
    },
    createProject: (state, action) => {
      state.items = [action.payload, ...state.items];
      setStoredSession(STORAGE_KEY, state.items);
    },
    updateProject: (state, action) => {
      state.items = state.items.map((project) => (project.id === action.payload.id ? action.payload : project));
      setStoredSession(STORAGE_KEY, state.items);
    },
    deleteProject: (state, action) => {
      state.items = state.items.filter((project) => project.id !== action.payload);
      setStoredSession(STORAGE_KEY, state.items);
    },
  },
});

export const { initializeProjects, createProject, updateProject, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;



