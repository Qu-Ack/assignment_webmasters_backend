import { NextFunction, Request, Response } from "express";

export function getAuthorizationHeader(req: Request, res: Response) {
    if (!req.headers.authorization) {
        res.status(403).json({"error": "No Auth Token"})
    } 

    const token = req.headers.authorization?.split(' ')[1]
    return token


}