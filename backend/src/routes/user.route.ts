import { Router } from "express";

import { register, login, logout } from "../controller/user.controller";

const userRouter = Router();

// Register a new user
userRouter.post("/register", register);

// Login a user
userRouter.post("/login", login);

// Logout a user
userRouter.post("/logout", logout);

export default userRouter;