import express from "express";
import { createReports } from "../controllers/reports.js";
import { readReports } from "../controllers/reports.js";
import { deleteReports } from "../controllers/reports.js";
import { updateReports } from "../controllers/reports.js";
const router = express.Router();

router.post("/", createReports);
router.get("/", readReports);
router.delete("/:id", deleteReports);
router.put("/:id", updateReports);

export default router;
