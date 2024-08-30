import { Request, Response, NextFunction } from "express";

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

// Middleware to authenticate the user based on session
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  // Check if the session exists and if the user is logged in
  if (req.session && req.session.user) {
    // Attach the user to the request object for further use
    req.body.userId = req.session.user.id; // Assuming the session stores user data with an `id` property
    return next(); // Continue to the next middleware or route handler
  } else {
    // User is not authenticated
    return res.status(401).json({ message: "Unauthorized access. Please log in." });
  }
};