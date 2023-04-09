import { CreateError } from "./Error.js";
import jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  let token;
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      try {
        token = authHeader.split(" ")[1];
        //console.log(token);
        if (!token) {
          return next(
            CreateError(
              401,
              "You are not authenticated. No authentication token."
            )
          );
        }
        const payload = jwt.verify(token, process.env.JWT);
        //console.log(payload);
        return next();
      } catch {
        return next(CreateError(403, "You are not authenticated. Authentication Token is not valid."));
      }
    } else {
      return next(
        CreateError(401, "You are not authenticated. No authentication token.")
      );
    }
    next();
  } catch (err) {
    return next(CreateError(401, "You are not authenticated."));
  }
};
