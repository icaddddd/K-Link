import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
        return res.status(401).json({
            error: "Belum login"
        })
    }

    const token = authorizationHeader.split(" ")[1];

    try {
        const loginSession = jwt.verify(token, "SecretKey")
        res.locals.loginSession = loginSession

        next()
    } catch (error) {
        return res.status(401).json({
            error: "Token salah!"
        })
    }
}

export default authenticate