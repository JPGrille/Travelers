import bcrypt from "bcrypt";
import passport from "passport";
import { pool } from "./connectDB";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, cb) => {
      try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if (result.rows.length === 0) {
          return cb(null, false, { message: "Incorrect email or password." });
        }

        const user = result.rows[0];
        const storedHashedPassword = user.password;

        const isMatch = await bcrypt.compare(password, storedHashedPassword);
        if (isMatch) {
          return cb(null, user);
        } else {
          return cb(null, false, { message: "Incorrect email or password." });
        }
      } catch (err) {
        console.error("Error in authentication:", err);
        return cb(err);
      }
    }
  )
);
  
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser(async (user: any, cb) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [user.id]);
    if (result.rows.length > 0) {
      cb(null, result.rows[0]);
    } else {
      cb(null, false);
    }
  } catch (err) {
    cb(err);
  }
});

export default passport;
