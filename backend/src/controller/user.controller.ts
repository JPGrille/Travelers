import { Request, Response, NextFunction } from "express";
import { pool } from "../config/connectDB";
import bcrypt from "bcryptjs";
import passport from "../config/passport";

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide all user details",
      });
    }

    // Simple email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length > 0) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
    const newUser = await pool.query(query, [username, email, hashedPassword]);

    return res.status(201).json({
      message: "User registered successfully",
      userId: newUser.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Login new user
export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }

  // Use Passport to authenticate the user
  passport.authenticate("local", (err: any, user: Express.User, info: { message: any; }) => {
    if (err) {
      console.error("Error during authentication:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      // Authentication failed, return error message from Passport
      return res.status(401).json({ message: info?.message || "Unauthorized" });
    }

    // Log the user in
    req.logIn(user, (err) => {
      if (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      // If login is successful, send a success response
      return res.status(200).json({
        message: "User logged in successfully",
        user,
      });
    });
  })(req, res, next);

  return;
};

export const logout = (req: Request, res: Response) => {
  // Log the user out
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }

    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to destroy session', error: err });
      }

      // Clear the session cookie with security settings
      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      // Send a successful logout response
      return res.status(200).json({ message: 'Logout successful' });
    });
  });
}

// Check if user is authenticated
export const checkSession = (req: Request, res: Response) => {
  if (req.isAuthenticated()) { 
    return res.status(200).json({ user: req.user });
  } else {
    return res.status(401).json({ message: "Not authenticated" });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await pool.query("SELECT id, name, email FROM users");
    if (users.rows.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId, name, email, password } = req.body;

    if (!userId || (!name && !email && !password)) {
      return res.status(400).json({
        message: "Please provide user ID and at least one field to update (name, email, or password).",
      });
    }

    // Check if the user exists
    const existingUser = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (existingUser.rows.length === 0) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== existingUser.rows[0].email) {
      const emailCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (emailCheck.rows.length > 0) {
        return res.status(400).json({
          message: "User with this email already exists",
        });
      }
    }

    let updatedUser;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const query = `
        UPDATE users
        SET name = $1, email = $2, password = $3
        WHERE id = $4
        RETURNING id
      `;
      updatedUser = await pool.query(query, [name, email, hashedPassword, userId]);
    } else {
      const query = `
        UPDATE users
        SET name = $1, email = $2
        WHERE id = $3
        RETURNING id
      `;
      updatedUser = await pool.query(query, [name, email, userId]);
    }

    return res.status(200).json({
      message: "User updated successfully",
      userId: updatedUser.rows[0],
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};