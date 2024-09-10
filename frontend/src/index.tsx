import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchPosts } from "./features/posts/postsSlice";
import { fetchUsers } from "./features/users/usersSlice";
import { checkSessionStatus } from "./features/auth/authSlice";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());
store.dispatch(checkSessionStatus());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
