import { Request, Response } from "express";
import { annoucement } from "../schemas/announcements";

export async function handleGetAnnoucements(req: Request, res: Response) {
  try {
    const annoucements = await annoucement.find({});
    res.status(200).json({
      annoucements,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function handlePostAnnoucements(req: Request, res: Response) {
  const { body } = req;
  try {
    await annoucement.create({
      title: body.title,
      description: body.description,
      date: body.date,
      link: body.link,
    });
    res.status(201).json({ status: "sucess" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function handleUpdateAnnouncements(req: Request, res: Response) {
  const { body } = req;
  try {
    await annoucement.findOneAndUpdate(
      { _id: body.id },
      {
        title: body.title,
        description: body.description,
        date: body.date,
        link: body.link,
      },
    );
    res.status(201).json({ status: "sucess" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function handleDeleteAnnouncements(req: Request, res: Response) {
  const { body } = req;
  try {
    await annoucement.findOneAndDelete({ _id: body.id });
    res.status(204).json({ status: "sucess" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
