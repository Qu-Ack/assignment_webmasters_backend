import { Router, Request, Response } from "express";
import { loginHandler} from "../handlers/roleHandler";
import { createTestUserHandler } from "../handlers/createTestUserHandler";


const router = Router()

// admin route

router.post("/admin", loginHandler)
router.post("/admin/create", createTestUserHandler)

export default router