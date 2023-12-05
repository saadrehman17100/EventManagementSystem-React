import express from "express";
import { createSpeakers } from "../controllers/speakers.js";
import { readSpeakers } from "../controllers/speakers.js";
import { updateSpeakers } from "../controllers/speakers.js";
import { deleteSpeakers } from "../controllers/speakers.js";
const router = express.Router();

router.post("/", createSpeakers);
router.get("/", readSpeakers);
router.put("/:id", updateSpeakers);
router.delete("/:id", deleteSpeakers);

export default router;
