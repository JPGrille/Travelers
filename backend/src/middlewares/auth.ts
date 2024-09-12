import { Request, Response, NextFunction } from "express";

declare module 'express-session' {
  export interface SessionData {
    passport?: {
      user?: { [id: string]: Number };
    };
  }
}

// Middleware to authenticate the user based on session
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  // Check if the session exists and if the user is logged in
  if (req.session && req.session.passport && req.session.passport.user) {
    // Attach the user to the request object for further use
    req.body.userId = req.session.passport.user.id;
    return next();
  } else {
    // User is not authenticated
    return res.status(401).json({ message: "Unauthorized access. Please log in." });
  }
};