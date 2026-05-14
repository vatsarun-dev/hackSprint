import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import { getStoredSession, setStoredSession } from "../../lib/utils";

export const loginUser = createAsyncThunk("auth/loginUser", async (payload) => {
  return authService.login(payload);
});

export const signupUser = createAsyncThunk("auth/signupUser", async (payload) => {
  return authService.signup(payload);
});

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  isBootstrapped: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuth: (state) => {
      const stored = getStoredSession("devconnect_session");
      if (stored) {
        state.user = stored;
        state.isAuthenticated = true;
      }
      state.isBootstrapped = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      setStoredSession("devconnect_session", null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isBootstrapped = true;
        setStoredSession("devconnect_session", action.payload);
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isBootstrapped = true;
        setStoredSession("devconnect_session", action.payload);
      })
      .addCase(signupUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { initializeAuth, logoutUser } = authSlice.actions;
export default authSlice.reducer;
