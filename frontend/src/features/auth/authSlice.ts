import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4000/api/user";

const initialState = {
  user: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk to check the session status on page load
export const checkSessionStatus = createAsyncThunk("auth/checkSessionStatus", async () => {
  const response = await axios.get(`${API_URL}/status`, { withCredentials: true });
  return response.data;
});

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials, {
        withCredentials: true,
      });
      return response.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message || "Failed to log in");
    }
  }
);

// Async thunk for logging out a user
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    return null;
  } catch (err: any) {
    return rejectWithValue(err.response.data.message || "Failed to log out");
  }
});

// Auth slice definition
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(checkSessionStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkSessionStatus.fulfilled, (state, action) => {
        state.user = action.payload.user || null;
        state.status = "succeeded";
      })
      .addCase(checkSessionStatus.rejected, (state) => {
        state.user = null;
        state.status = "failed";
      });
  },
});

export const { setUser } = authSlice.actions;

export const selectCurrentUser = (state: { auth: { user: any; }; }) => state.auth.user;
export const selectAuthStatus = (state: { auth: { status: any; }; }) => state.auth.status;
export const selectAuthError = (state: { auth: { error: any; }; }) => state.auth.error;

export default authSlice.reducer;
