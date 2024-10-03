import mongoose from "mongoose";

const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  link: { type: String, required: true },
});

export const annoucement = mongoose.model("Announcements", announcementSchema);
