import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import authSlice from "../features/auth/authSlice";
import countriesSlice from "../features/countries/countriesSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    auth: authSlice,
    visitedCountries: countriesSlice
  }
});