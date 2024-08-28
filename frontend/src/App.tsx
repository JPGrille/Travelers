import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AddPostForm from "./features/posts/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import PostsList from "./features/posts/PostsList";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Layout from "./components/Layout/Layout";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<PostsList />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;