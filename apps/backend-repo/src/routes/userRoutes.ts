import express from "express";
import {
  addUser,
  generateToken,
  getUsers,
  login,
  updateUser,
} from "../controller/api";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/add", authMiddleware, addUser);
router.get("/list", authMiddleware, getUsers);
router.put("/update", authMiddleware, updateUser);
router.post("/login", login);

export default router;
