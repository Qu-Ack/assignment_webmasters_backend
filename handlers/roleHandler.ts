import { Response, Request, NextFunction } from "express";
import { User } from "../schemas/users";
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
import dotenv from "dotenv"
import { getAuthorizationHeader } from "./getAuthorizationHeader";
dotenv.config()


export async function loginHandler(req: Request, res:Response, next: NextFunction) {
    const {body} = req
    try {
    const user = await User.findOne({email: body.email})
    if (!user) {
        res.json({"error": "wrong credentials"})
        return
    }

    bcrypt.compare(body.password, user.password, function (err: Error, success: boolean) {
        if (success) {
            const token = jwt.sign({id: user.id, role: user.role}, process.env.SECRET)
            res.json({"status": "sucess", "token": token})
        } else {
            res.json({"error": "wrong credentials"})
        }
    })


    } catch (err) {
        console.log("[ERROR]\n", err)
        res.json({"error": "Internal Server Error"})
    }

}


export function adminAuth(req: Request, res:Response, next: NextFunction) {
    const token = getAuthorizationHeader(req, res) 

    const decoded = jwt.verify(token, process.env.SECRET)

    if (decoded.role == "ADMIN" || decoded.role == "SUPERADMIN") {
        next()
    } 

    res.status(401).json({"error": "Forbidden"})
}

export function superAdminAuth(req: Request, res:Response, next: NextFunction) {
    const token = getAuthorizationHeader(req, res) 

    const decoded = jwt.verify(token, process.env.SECRET)

    if (decoded.role == "SUPERADMIN") {
        next()
    } 

    res.status(401).json({"error": "Forbidden"})
}