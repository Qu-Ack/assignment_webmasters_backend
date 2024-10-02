import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type:String, required: true},
    email: {type:String, required: true},
    role: {type:String, enum: ['ADMIN', 'SUPERADMIN', 'USER'], default: "USER"},
    password: {type:String, required:true}
})

export const User = mongoose.model("Users", userSchema)