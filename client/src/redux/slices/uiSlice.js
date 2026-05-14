import { createSlice } from "@reduxjs/toolkit";
import { getStoredSession, setStoredSession } from "../../lib/utils";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    theme: "dark",
    sidebarCollapsed: false,
  },
  reducers: {
    initializeTheme: (state) => {
      const storedTheme = getStoredSession("devconnect_theme");
      state.theme = storedTheme || "dark";
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      setStoredSession("devconnect_theme", state.theme);
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
  },
});

export const { initializeTheme, toggleTheme, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
