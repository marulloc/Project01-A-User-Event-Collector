import { Request, Response, NextFunction } from "express";
import decodeJWT from "../utils/decodeJWT";

const combineMiddle = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const mainPath = req.path.split("/")[1];
    const { authorization } = req.headers;

    console.log(mainPath);
    console.log(authorization);
    if (authorization) {
      const token = authorization.split(" ")[1];
      const userInfo = decodeJWT(token);
      req.user = userInfo;
    } else if (mainPath === "user" || mainPath === "library") {
      throw new Error("Unauthorized");
    }
    return next();
  } catch (err) {
    return res.status(401).send(err);
  }
};

export default combineMiddle;
