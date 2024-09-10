import { Request, Response } from "express";
import { pool } from "../config/connectDB";

// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
    try {
      const posts = await pool.query("SELECT * FROM posts");
      if (posts.rows.length === 0) {
        return res.status(404).json({ message: "No posts found" });
      }
      return res.status(200).json(posts.rows);
    } catch (error) {
      console.error("Error fetching posts:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
};
  
// Get a single post by ID
export const getPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [Number(id)]);
        if (post.rows.length === 0) {
        return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json(post.rows[0]);
    } catch (error) {
        console.error("Error fetching the post:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
  
// Get all posts by a specific user
export const getAllUserPosts = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
  
      const posts = await pool.query("SELECT * FROM posts WHERE created_by = $1", [Number(userId)]);
      if (posts.rows.length === 0) {
        return res.status(404).json({ message: "No posts found for this user" });
      }
      return res.status(200).json(posts.rows);
    } catch (error) {
      console.error("Error fetching user posts:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Create a new post
export const newPost = async (req: Request, res: Response) => {
    try {
      const { title, content, img, authorId } = req.body;
  
      // Check if all required fields are provided
      if (!title || !content || !img || !authorId) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Insert new post into the database
      const newPost = await pool.query(
        "INSERT INTO posts (title, summary, date, img, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [title, content, new Date(), img, authorId]
      );
  
      return res.status(201).json({
        message: "Post created successfully",
        post: newPost.rows[0],
      });
    } catch (error) {
      console.error("Error creating post:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update an existing post
export const updatePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, summary, img } = req.body;
    
        // Fetch the existing post to check ownership
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [Number(id)]);
        if (post.rows.length === 0) {
        return res.status(404).json({ message: "Post not found" });
        }

        const { userId } = req.body;
        // Check if the user is the owner of the post
        if (post.rows[0].created_by !== userId) {
          return res.status(403).json({ message: "Unauthorized to update this post" });
        }

        const query = `
          UPDATE posts
          SET title = $1, summary = $2, img = $3
          WHERE id = $4
          RETURNING id
        `;
        const updatedPost = await pool.query(query, [title, summary, img, Number(id)]);
    
        return res.status(201).json({
          message: "Post updated successfully",
          userId: updatedPost.rows[0],
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Internal Server Error",
        });
    }
};

// Delete an existing post
export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
    
        // Fetch the existing post to check ownership
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [Number(id)]);
        if (post.rows.length === 0) {
        return res.status(404).json({ message: "Post not found" });
        }

        const { userId } = req.body; 

        // Check if the user is the owner of the post
        if (post.rows[0].created_by !== userId) {
            return res.status(403).json({ message: "Unauthorized to delete this post" });
        }
  
        // Delete the post
        await pool.query("DELETE FROM posts WHERE id = $1", [Number(id)]);
        return res.status(200).json({ 
            message: "Post deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Internal Server Error",
        });
    }
};