import { Router } from "express";

import { register, login, logout, checkSession, getAllUsers } from "../controller/user.controller";

const userRouter = Router();

// Register a new user
userRouter.post("/register", register);

// Login a user
userRouter.post("/login", login);

// Logout a user
userRouter.post("/logout", logout);

// Check session status
userRouter.get("/status", checkSession);

// Get all users
userRouter.get("/", getAllUsers);

export default userRouter;