import  express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import APIROUTER from "../routers/apirouter"

dotenv.config()

const PORT = process.env.PORT || 3000
const DB_STRING = process.env.DB_STRING!

async function connectDB() {

    try {
        await mongoose.connect(DB_STRING)
    } catch(err) {
        console.log("[ERROR]!! \n", err)
        throw Error("[Server]: Cannot Connect To the DB")
    }
}

connectDB().then(() => console.log("[SERVER]: connected to DB")).catch(err => {
    console.log(err)
})

const app: Express  = express();


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api", APIROUTER)

app.get("/healthz", (req: Request, res: Response) => {
    res.status(200).send("SERVER IS GOOD")
})


app.listen(PORT, () => {
    console.log(`[SERVER]: Server Running on ${PORT}`)
})






