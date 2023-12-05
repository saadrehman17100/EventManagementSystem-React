import express from "express";
import {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  signin,
  signup,
} from "../controllers/users.js";
const router = express.Router();

router.post("/", createUser);
router.get("/", readUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
