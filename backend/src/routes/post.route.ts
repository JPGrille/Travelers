import { Router } from "express";
import { authenticateUser } from "../middlewares/auth";
import { 
    getAllPosts, 
    getPost, 
    getAllUserPosts, 
    deletePost, 
    newPost, 
    updatePost 
} from "../controller/post.controller";

const postRouter = Router();

// Get all posts
postRouter.get("/", getAllPosts);

// Get a post by id
postRouter.get("/:id", getPost);

// Get all posts for a specified user
postRouter.get("/user/:userId", getAllUserPosts);

// Update an existing post
postRouter.put("/:id", authenticateUser, updatePost);

// Create a new post
postRouter.post("/", authenticateUser, newPost);

// Delete an existing post
postRouter.delete("/:id", authenticateUser, deletePost);

export default postRouter;