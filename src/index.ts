import  express, { Express, Request, Response } from "express";
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 3000

const app: Express  = express();

app.listen(PORT, () => {
    console.log(`[SERVEr]: Server Running on ${PORT}`)
})






