import { Response, Request, NextFunction } from "express";
import { User } from "../schemas/users";
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
import dotenv from "dotenv"
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
        res.json({"error": "Internal Server Error"})
    }




}