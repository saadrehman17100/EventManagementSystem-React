import express from "express";
import {
  createParticipant,
  readParticipants,
  updateParticipants,
  deleteParticipants,
} from "../controllers/participant.js";

const router = express.Router();

router.post("/", createParticipant);
router.get("/", readParticipants);
router.put("/:id", updateParticipants);
router.delete("/:id", deleteParticipants);

export default router;
