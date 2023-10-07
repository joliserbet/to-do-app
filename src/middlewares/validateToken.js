import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Invalid token, authorization denied" });
      }
      req.user = user;
      next();
    });
  }
};
