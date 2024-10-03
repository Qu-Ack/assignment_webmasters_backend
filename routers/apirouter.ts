import { Router, Request, Response } from "express";
import {
  adminAuth,
  loginHandler,
  superAdminAuth,
} from "../handlers/roleHandler";
import { createTestUserHandler } from "../handlers/createTestUserHandler";
import {
  handleDeleteAnnouncements,
  handleGetAnnoucements,
  handlePostAnnoucements,
  handleUpdateAnnouncements,
} from "../handlers/announcementHandlers";

const router = Router();

// admin router
router.post("/admin", loginHandler);
router.get(
  "/test/superadmin",
  superAdminAuth,
  (req: Request, res: Response) => {
    res.send("working");
  },
);
router.post("/admin/create", createTestUserHandler);

// announcements route
router.get("/announcement", handleGetAnnoucements);
router.post("/announcement", adminAuth, handlePostAnnoucements);
router.put("/announcement", adminAuth, handleUpdateAnnouncements);
router.delete("/announcement", adminAuth, handleDeleteAnnouncements);

// events route

router.get("/events");

export default router;

