import express from "express";
import { createSchedule } from "../controllers/schedule.js";
import { readSchedules } from "../controllers/schedule.js";
import { deleteSchedules } from "../controllers/schedule.js";
import { updateSchedules } from "../controllers/schedule.js";
const router = express.Router();

router.post("/", createSchedule);
router.get("/", readSchedules);
router.delete("/:id", deleteSchedules);
router.put("/:id", updateSchedules);

export default router;
