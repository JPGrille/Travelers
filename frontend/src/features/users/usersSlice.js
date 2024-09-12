import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "http://localhost:4000/api/user";

const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.name.localeCompare(a.name)
});

const initialState = usersAdapter.getInitialState({
  status: "idle",
  error: null
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
});

export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
  const { id } = user;
  const response = await axios.put(`${USERS_URL}/${id}`, user, { withCredentials: true });
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      usersAdapter.upsertMany(state, action.payload);
    })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          state.status = "succeeded";
          console.log(action.payload);
          return;
        }
        usersAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectPostIds
} = usersAdapter.getSelectors(state => state.users);

export default usersSlice.reducer;