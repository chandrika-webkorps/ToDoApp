import jwt,{type JwtPayload} from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
import type { Request, Response, NextFunction } from "express";
export const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(404).json({ error: "Unauthorized: No token provided" });
    }
    const token=authHeader.split(" ")[1]
    if(!token) return res.status(401).json({error:"Unauthorized"})
    try{
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        return res.status(500).json({ error: "JWT secret not configured" });
      }
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
      req.user=decoded
      next()
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
}

interface userData{
  id:string,
  email:string
}

export const generateToken=(userData:userData)=>{
  return jwt.sign(
    {id:userData.id,email:userData.email},
    process.env.JWT_SECRET as string
  )
}