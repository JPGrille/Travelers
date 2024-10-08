import React from "react";
import { Routes, Route } from "react-router-dom";
import AddPostForm from "./features/posts/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import PostsList from "./features/posts/PostsList";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Layout from "./components/Layout/Layout";
import UserPage from "./features/users/UserPage";
import UsersList from "./features/users/UsersList";
import About from "./pages/About/About";
import Team from "./pages/Team/Team";
import VisitedCountries from "./features/countries/VisitedCountries";
import NotFound from "./pages/NotFound/NotFound";
import UserProfile from "./features/users/UserProfile";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<PostsList />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
          <Route path="profile/:userId" element={<UserProfile />} />
          <Route path="posts/:userId" element={<PostsList />} />
          <Route path="countries/:userId" element={<VisitedCountries showForm={true} />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  );
}

export default App;