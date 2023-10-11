import { noToken, invalidToken } from "../utils/ErrorMessages.js";
import { CreateError } from "../utils/Error.js";
import jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader !== undefined) {
      const token = authHeader.split(" ")[1];
      if (!token) {
        return next(CreateError(401, noToken));
      }
      try {
        const payload = jwt.verify(token, process.env.JWT);
        const { username } = payload;
        req.params.by = username;
        return next();
      } catch (error) {
        return next(CreateError(403, invalidToken));
      }
    } else {
      return next(CreateError(401, noToken));
    }
  } catch (error) {
    next(CreateError(401, "Authentication failure."));
  }
};

export const VerifyUser = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT);
    const { user_id } = payload;
    if (user_id !== +req.params.user_id) {
      return next(CreateError(403, "You are not authorized."));
    } else {
      return next();
    }
  } catch (error) {
    next(CreateError(500, "Internal server error."));
  }
};

export const VerifyAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT);
    const { role } = payload;
    if (role !== "Admin") {
      return next(
        CreateError(403, "Forbidden resource (invalid permissions).")
      );
    } else {
      return next();
    }
  } catch (error) {
    next(CreateError(500, "Internal server error."));
  }
};
