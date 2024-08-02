import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "./config";
export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization

    if(!authHeaders || !authHeaders.startsWith('Bearer ')) {
       return res.status(403).json({message: "Invalid headers"})
    }

    const token = authHeaders.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        // @ts-ignore
        req.userId = decoded.userId
        next();
    } 
    catch(e) {
      return  res.status(403).json({message: "Token not valid", error: e})
    }
}