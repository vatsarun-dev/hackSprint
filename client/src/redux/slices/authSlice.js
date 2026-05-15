import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import { getStoredSession, setStoredSession } from "../../lib/utils";

export const loginUser = createAsyncThunk("auth/loginUser", async (payload) => {
  return authService.login(payload);
});

export const signupUser = createAsyncThunk("auth/signupUser", async (payload) => {
  return authService.signup(payload);
});

export const initializeAuth = createAsyncThunk("auth/initializeAuth", async (_, { rejectWithValue }) => {
  const stored = getStoredSession("devconnect_session");
  if (!stored) {
    return rejectWithValue("No active session");
  }

  try {
    return await authService.me();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "No active session");
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await authService.logout();
});

export const updateProfile = createAsyncThunk("auth/updateProfile", async (payload) => {
  return authService.updateProfile(payload);
});

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  isBootstrapped: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateStoredAuth: (state) => {
      const stored = getStoredSession("devconnect_session");
      if (stored) {
        state.user = stored;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isBootstrapped = true;
        state.error = "";
        setStoredSession("devconnect_session", action.payload);
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isBootstrapped = true;
        setStoredSession("devconnect_session", null);
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isBootstrapped = true;
        setStoredSession("devconnect_session", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Login failed";
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isBootstrapped = true;
        setStoredSession("devconnect_session", action.payload);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Signup failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = "";
        setStoredSession("devconnect_session", null);
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        setStoredSession("devconnect_session", null);
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        setStoredSession("devconnect_session", action.payload);
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Profile update failed";
      });
  },
});

export const { hydrateStoredAuth } = authSlice.actions;
export default authSlice.reducer;



