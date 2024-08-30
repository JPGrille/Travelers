import { Router } from "express";

import { register, login, logout, checkSession } from "../controller/user.controller";

const userRouter = Router();

// Register a new user
userRouter.post("/register", register);

// Login a user
userRouter.post("/login", login);

// Logout a user
userRouter.post("/logout", logout);

// Check session status
userRouter.get("/status", checkSession);

export default userRouter;