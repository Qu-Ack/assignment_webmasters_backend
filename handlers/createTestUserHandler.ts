import { Request, Response } from "express";
import { User } from "../schemas/users";
var bcrypt = require("bcryptjs")

export async function createTestUserHandler(req: Request, res: Response) {
    const {body} = req

    bcrypt.genSalt(10, function(err: Error, salt: string) {
        if (err) {
            res.json({"error": "Internal Server Error"})
        }
        bcrypt.hash(body.password, salt, async function(err: Error, hash: string) {
            if (err) {
                res.json({"error": "Internal Server Error"})
            }

            try {
        await User.create({
          name: body.name,
          email: body.email,
          role: body.role,
          password: hash

        })
        res.json({"status": "sucess"})
            } catch (err) {
                console.log("[ERROR]:\n", err) 
            }


        });
    });


}