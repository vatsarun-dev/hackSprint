import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import projectsReducer from "./slices/projectsSlice";
import blogsReducer from "./slices/blogsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    projects: projectsReducer,
    blogs: blogsReducer,
  },
});



