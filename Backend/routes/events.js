import express from "express";
import {
  createEvent,
  deleteEvent,
  readEvent,
  updateEvent,
  register,
  viewEvent,
} from "../controllers/events.js";

const router = express.Router();
router.get("/read", viewEvent);
router.post("/", createEvent);
router.get("/", readEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.post("/register", register);

export default router;
